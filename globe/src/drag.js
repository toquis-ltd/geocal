import * as d3 from "d3";

import {width, height, projection, graticule, path} from "./parrameters"

const λ = d3.scaleLinear().domain([0, width]).range([-180, 180]);
const φ = d3.scaleLinear().domain([0, height]).range([90, -90]);

export default function drager (svg) {
    const  drag = d3.drag().subject(() => {
      var r = projection.rotate();
      const k = 75 / projection.scale()
      return {
        x: λ.invert(r[0]),
        y: φ.invert(r[1])
      };
  }).on("drag", event => {
      projection.rotate([λ(event.x), φ(event.y)]);
  
      svg.selectAll(".graticule")
          .datum(graticule)
          .attr("d", path);
      
      svg.selectAll(".country")
          .attr("d", path);
  });
  return drag;
}