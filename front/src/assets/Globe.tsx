import React from 'react';
import * as d3 from 'd3';

import { feature } from 'topojson';

import world from '../data/map.json';


import './globe.css'

interface GlobeProps {
  width: number;
  height: number;
  onSelect: (name: string) => void;
}

const Globe: React.FC<GlobeProps> = React.memo(({ width, height, onSelect }) => {

  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const rotate = React.useRef<[number, number, number]>([0, 0, 0]);
  const World = feature(world, world.objects.collection);
  const coord = React.useRef({lat:0, long: 0});

  React.useEffect(() => {
    rotate.current =
      typeof window.localStorage.getItem('rotate') === 'string'
        ? JSON.parse(window.localStorage.getItem('rotate'))
        : rotate.current;
  }, []);

  React.useEffect(() => {
    const graticule = d3.geoGraticule();
    const projection = d3
      .geoOrthographic()
      .scale(width / 2.5)
      .translate([width / 2, height / 2])
      .rotate(rotate.current);

    const path = d3.geoPath(projection);
    const svg = d3.select(svgRef.current);
    const g = svg.append('g');

    g.append('path')
                .attr('class', 'sphere')
                .attr('d', path({type: 'Sphere'}))
                .on("click", (event,d)=>{
                  const [x, y] = d3.pointer(event);
                  const [lat, long] = projection.invert([x, y])
                  
                  // more info about areaSize in def
                  coord.current = {lat:lat, long:long, areaSize:600};
                  onSelect(coord.current);
                  g.selectAll("circle").remove()
                  const [x1, y1] = projection([lat, long])
                  g.append("circle")
                                      .attr("cx", x1)
                                      .attr("cy", y1)
                                      .attr("r", 5)
                                      .attr("fill", "red");
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
      .attr('class', 'country');
    
    const [x, y] = projection([coord.current.lat, coord.current.long])
    g.append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 5)
      .attr("fill", "red");

    g.selectAll('.country').on('click', (event, d) => {
        const [x, y] = d3.pointer(event);
        const [lat, long] = projection.invert([x, y])
        coord.current = {lat:lat, long:long, areaSize:200};
        onSelect(coord.current);
        g.selectAll("circle").remove()
        const [x1, y1] = projection([lat, long])
        g.append("circle")
                            .attr("cx", x1)
                            .attr("cy", y1)
                            .attr("r", 5)
                            .attr("fill", "red");
    });

    g.call(
      d3
        .drag<SVGGElement, unknown>()
        .on('drag', (event, d) => {
          const k = 50 / projection.scale();
          rotate.current = projection.rotate();
          projection.rotate([
            rotate.current[0] + event.dx * k,
            rotate.current[1] - event.dy * k,
          ]);

          g.selectAll('.graticule').attr('d', path);
          g.selectAll('path').attr('d', path);
          g.selectAll('.sphere').attr('d', path({ type: 'Sphere' }));  

          const [x, y] = projection([coord.current.lat, coord.current.long])
          g.select('circle').attr('cx', x).attr('cy', y);  
        })
        .on('end', (event, d) => {
          window.localStorage.setItem(
            'rotate',
            JSON.stringify(projection.rotate())
          );
        })
    );

    return () => {
      svg.selectAll('g').remove();
    };
  }, [World.features, rotate, width, height, onSelect]);

  return <svg width={width} height={height} ref={svgRef} />;
});

export default Globe;