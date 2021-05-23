// import {feature} from 'topojson';
// import * as d3 from "d3";

// const node = document.createElement('div');
// var name;

// var svg = d3.select(node,  {passive: true}).append("svg")
//     .attr("width", width)
//     .attr("height", height);


// //var bounds = {westBoundLon: 1, northBoundLat: 1, eastBoundLon: 1, southBoundLat: 1 };
// let bounds;
// var width = 960,
//     height = 600;
// var svg = d3.select(node,  {passive: true}).append("svg")
//     .style("width", "100%")
//     .style("height", height)
// let projection = projections[1].value.precision(0.1);

// // const projection = d3.geoOrthographic();

// const g = d3.geoGraticule();
// let pathGenerator = d3.geoPath(projection);

// g.append('path')
//     .attr('class', 'sphere')
//     .attr('d', pathGenerator({type: 'Sphere'}))
//     .on("click", function(event,d) {
//       name = "World"
//     });

// g.append('path')
//     .datum(graticule)
//     .attr("class", "graticule")
//     .attr("d", pathGenerator);

// g.call(d3.drag()
// .on("drag", (event, d) => {
//   g.selectAll('.states').remove();
//   g.selectAll('.provinces').remove();
//   g.selectAll('.rect').remove();
//   drawStates(America)
//   drawCanada(Canada)
//     const rotate = projection.rotate()
//     const k = 50 / projection.scale()
//     projection.rotate([
//       rotate[0] + event.dx * k,
//       rotate[1] - event.dy * k
//     ])
//     pathGenerator = d3.geoPath().projection(projection)
//   	g.selectAll(".graticule").attr("d", pathGenerator)
//   	g.selectAll("path").attr("d", pathGenerator)
//     g.selectAll('.sphere').attr("d", pathGenerator({type: 'Sphere'}))
// }), {passive: true});

// function drawWorld(countries){
//   console.log("called");
//   g.selectAll('.country').data(countries.features)
//   .enter().append('path')
//     .attr('class', 'country')
//     .attr('d', pathGenerator)
//     .on("click", function(event,d) {
//       name = d.properties.name
//     })
// }
// function drawStates(data){
//   g.selectAll('.states').data(data.features)
//   .enter().append('path')
//   .attr('class', 'states')
//   .attr('d', pathGenerator)
//   .on("click", function(event, d) {
//     name = d.properties.name
//   })
// }
//   function drawCanada(canada){
//     g.selectAll('.provinces').data(canada.features)
//     .enter().append('path')
//     .attr('class', 'provinces')
//     .attr('d', pathGenerator)
//     .on("click", function(event, d) {
//       name = d.properties.name
//     })
//   };

// function drawWorld(countries){
//   if (countries.features !== undefined) 
//   g.selectAll('.country').data(countries.features)
//   .enter().append('path')
//     .attr('class', 'country')
//     .attr('d', pathGenerator)
//     .on("click", function(event,d) {
//       console.log(d.properties.name)
//       name = d.properties.name
//     })
// }
// function drawStates(data){
//   g.selectAll('.states').data(data.features)
//   .enter().append('path')
//   .attr('class', 'states')
//   .attr('d', pathGenerator)
//   .on("click", function(event, d) {
//     console.log(d.properties.name)
//     name = d.properties.name
//   })
// }
// function drawCanada(canada){
//   g.selectAll('.provinces').data(canada.features)
//   .enter().append('path')
//   .attr('class', 'provinces')
//   .attr('d', pathGenerator)
//   .on("click", function(event, d) {
//     console.log(d.properties.name)
//     name = d.properties.name
//   })
// }
// function drawBox(data) {
//   if (data === undefined) return null
//   else {
//     bounds = data;
//   }
//   let arc = d3.geoGraticule().extentMajor([[bounds.westBoundLon, bounds.southBoundLat], [bounds.eastBoundLon, bounds.northBoundLat]]);
//   g.selectAll('.rect').remove();
//   g.append('path')
//   .attr('class', 'rect')
//   .attr('d', pathGenerator(arc.outline()))
//   .style("pointer-events", "none")
// }

// Promise.all([
//   d3.json("states-10m.json"),
//   d3.json("World.json"),
//   d3.json("canada_provinces.json")
//   ]).then(([UsJson,WorldJson, ProvincesJson]) => {
//   console.log(WorldJson);
//   const world = feature(WorldJson, WorldJson.objects.custom),
//   states = feature(UsJson, UsJson.objects.states),
//   provinces = feature(ProvincesJson, ProvincesJson.objects.canada_provinces);

//   drawWorld(world)
//   drawCanada(provinces)
//   drawStates(states)

// },  { passive: true});

// g.call(d3.zoom()
// .scaleExtent([0.9,10])

// .on('zoom', (event) => {
//   g.attr('transform', event.transform, )
// }, ()=>null, {passive: true}), {passive: true});

// export const getNode = () => node;
// export const getCountry = () => {
//   return name
// };