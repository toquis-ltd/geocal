import { useRef, useEffect, useCallback,  memo } from 'react';
import {feature} from 'topojson';
import * as d3 from 'd3';

import world from '../../../data/globe.json';

import './globe.sass'

export default memo(function Globe({height=300, width=300}) {

        const svgRef = useRef(null);
        const rotate = useRef(JSON.parse(window.localStorage.getItem('rotate')) || [0,0,0]);
        const World = feature(world, world.objects.custom);
        
        const graticule = d3.geoGraticule();
        const projection = d3.geoOrthographic().scale(width/3).translate([width/3 , height/3]).rotate(rotate.current);
        const path = d3.geoPath(projection);

        const rotationHandler = useCallback((value) => {
            const save = window.localStorage.setItem('rotate', JSON.stringify(value));
            rotate.current = value;
            setTimeout(save, 400);
        }, []);

        //globe logic
        useEffect(() => {
            const svg = d3.select(svgRef.current);
            const g = svg.append('g')

            g.append('path')
                .attr('class', 'sphere')
                .attr('d', path({type: 'Sphere'}))
                .on("click", function(event,d) {
                    alert("World")
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

            g.call(d3.drag().on("drag", (event, d) => {
                    rotationHandler(projection.rotate());
                    const k = 50 / projection.scale()
                    projection.rotate([
                      rotate.current[0] + event.dx * k,
                      rotate.current[1] - event.dy * k
                    ])
                    
                    g.selectAll(".graticule").attr("d", path);
                    g.selectAll("path").attr("d", path)
                    g.selectAll('.sphere').attr("d", path({type: 'Sphere'}))

            }));
            
            g.call(d3.zoom()
                .scaleExtent([1.0, 2.0])
                .on('zoom', event => {
                    g.selectAll('transform', event.transform);
                })
                
            );
            
        }, [graticule, path, World.features, projection, rotate]);


        return <svg width={width} height={height} ref = {svgRef}/>
});