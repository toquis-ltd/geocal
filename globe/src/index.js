import * as d3 from "d3";

import drager from './drag';

import {graticule, path, world as map} from './parrameters';

import "./style.css"

const svg = d3.select('svg');
const g = svg.append('g')
const drag = drager(svg);

g.append('path')
  .attr('class', 'sphere')
  .attr('d', path({type: 'Sphere'}))
  .on("click", (event,d)=>{
      alert("World")
  });

g.append('path')
    .datum(graticule)
    .attr("class", "graticule")
    .attr('d', path)

g.selectAll('.country')
    .data(map.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('class', 'country')
    .on("click", (event, d)=>{
        alert(d.properties.name)
    });

svg.call(drag);