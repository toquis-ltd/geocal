import { useRef, useEffect, memo } from 'react';
import {feature} from 'topojson';
import * as d3 from 'd3';

import useWinSize from '../../../hooks/useWinSize'
import world from '../../../data/globe.json';

import './globe.sass'

export default memo(function Globe({}) {
        const size = useWinSize();
        const svgRef = useRef(null);
        const mapRatio = 0.5;
        
        let height = 300;
        let width = 300;

        const graticule = d3.geoGraticule();
        const World = feature(world, world.objects.custom);
        
        const projection = d3.geoOrthographic().scale(width/3).translate([width/3 , height/2]);
        const path = d3.geoPath(projection);

        useEffect(() => {
            const svg = d3.select(svgRef.current);
            const g = svg.append('g')
            
            const resize = () => {
                width = size.width
                height = width * mapRatio;
    
                projection.scale(width/3).translate([width/3 , height/2])
    
                g?.selectAll("path").attr('d', path)
                g?.selectAll(".graticule").attr('d', path)
                g?.selectAll('.sphere').attr("d", path({type: 'Sphere'}))
            }

            g.append('path').datum(graticule).attr("class", "graticule").attr('d', path);

            g.call(d3.drag()
            .on("drag", (event, d) => { //while dragging
                const rotate = projection.rotate() //rotation for any projection
                const k = 50 / projection.scale()
                projection.rotate([
                  rotate[0] + event.dx * k,
                  rotate[1] - event.dy * k
                ])
                
                const path = d3.geoPath().projection(projection);
                
                g.selectAll(".graticule").attr("d", path);
                g.selectAll("path").attr("d", path);
                g.selectAll('.sphere').attr("d", path({type: 'Sphere'}));

            }), {passive: true});

            g.call(d3.zoom()
                .scaleExtent([1.0,9])
                .on('zoom', (event) => {
                    g.attr('transform', event.transform)
                })
            );
            
            g.selectAll('.country')
             .data(World.features)
             .enter().append('path')
             .attr('class', 'country')
             .attr('d', path)
             .on("click", function(event,d) { //add onClick element to get the country name
                 alert(d.properties.name)
                });
            
            d3.select(window).on('resize', resize);

        }, [graticule, path]);

        return <svg width={width} height={height} ref = {svgRef} />
});