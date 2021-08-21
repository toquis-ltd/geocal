// @ts-nocheck
import { useRef, useEffect,  memo } from 'react';
import { feature } from 'topojson';
import * as d3 from 'd3';

import world from '../../../data/globe.json';

import './globe.sass'

export default memo(function Globe({width, height, func}) {
        
    const svgRef = useRef(null);
    const rotate = useRef([0,0,0]);
    const World = feature(world, world.objects.custom);
    
    useEffect(()=>{
        rotate.current =  (typeof window.localStorage.getItem('rotate') === 'string') ?
                        JSON.parse(window.localStorage.getItem('rotate')) : rotate.current;
    }, [])
    
    //globe logic
    useEffect(() => {

            const graticule = d3.geoGraticule();
            const projection = d3.geoOrthographic()
                            .scale(width/3.5) //7.4 is scale coef witch work well with width*0.8 of parent size and inherit heeght
                            .translate([width/3, height/3])
                            .rotate(rotate.current);

            const path = d3.geoPath(projection);
            const svg = d3.select(svgRef.current);
            const g = svg.append('g')

            g.append('path')
                .attr('class', 'sphere')
                .attr('d', path({type: 'Sphere'}))
                .on("click", (event,d)=>{
                    func("World")
                });

            g.append('path')
                .datum(graticule)
                .attr("class", "graticule")
                .attr('d', path)
            
            g.selectAll('.country')
                .data(World.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('class', 'country')
            
            
            /*                  Listeners
            ###################################################
            ###################################################
            */
            
            g.selectAll('.country')
                .on("click", (event, d) => {
                    alert(d.properties.name)
                });
            
            g.call(d3.drag()
                            .on("drag", (event, d) => {
                                    const k = 50 / projection.scale()
                                    rotate.current = projection.rotate();
                                    projection.rotate([
                                    rotate.current[0] + event.dx * k,
                                    rotate.current[1] - event.dy * k
                                ])
                                
                                g.selectAll(".graticule").attr("d", path);
                                g.selectAll("path").attr("d", path)
                                g.selectAll('.sphere').attr("d", path({type: 'Sphere'}))

                            })
                            .on("end", (event, d) => {
                                window.localStorage.setItem('rotate', JSON.stringify(projection.rotate()));
                            })
            );
            
            g.call(d3.zoom()
                .scaleExtent([1, 10])
                .on('zoom', event => {
                    g.selectAll('country', event.transform);
                }, {passive: true})
            );
            
            return () => {
                svg.selectAll('g').remove()
            }
            
            }, [World.features, rotate, width, height]);

    return <svg width={width} height={height} ref={svgRef}/>
});