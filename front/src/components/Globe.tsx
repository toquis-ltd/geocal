// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from 'react';
import * as d3 from 'd3';

import { feature } from 'topojson';

import world from '../data/map.json';

interface GlobeProps {
  width: number;
  height: number;
  onSelect: React.Dispatch<PointCoordinate>;
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
    .scale(width / 2.2)
    .translate([width / 2, height / 2])
    .rotate(rotate.current);

    const path = d3.geoPath(projection);
    const svg = d3.select(svgRef.current);
    const g = svg.append('g');

    g.append('path')
    .style('fill', '#6e7a96')
    .attr('class', 'sphere')
    .attr('d', path({type: 'Sphere'}))
    .on("click", (event,d)=>{
      const [x, y] = d3.pointer(event);
      const [long, lat] = projection.invert([x, y])
      coord.current = {lat:lat, long:long};
      onSelect(coord.current);
      g.selectAll("circle").remove()
    });

    g.append('path')
    .datum(graticule)
    .attr("class", "graticule")
    .attr('d', path)
    .attr('fill', 'none')
    .attr('stroke', '#3a3a3a')
    .attr('stroke-width', '.5px')
    .attr('stroke-opacity', '0.5')
                  
    g.selectAll('.country')
    .data(World.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('class', 'country')
    .attr('stroke-width', '0.5px')
    .attr('stroke', 'black')
    .attr('fill', '#1677ff')
    
    const [x, y] = projection([coord.current.long, coord.current.lat])
    g.append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 5)
    .attr("fill", "red");
      

    g.selectAll('.country').on('click', (event, d) => {
      const [x, y] = d3.pointer(event);
      const [long, lat] = projection.invert([x, y])
      coord.current = {lat:lat, long:long, areaSize:200};
      onSelect(coord.current);
      g.selectAll("circle").remove()
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

          g.selectAll('.graticule').attr('d', path)
          g.selectAll('path').attr('d', path);
          g.selectAll('.sphere').attr('d', path({ type: 'Sphere' }));  

          const [x, y] = projection([coord.current.long, coord.current.lat])
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