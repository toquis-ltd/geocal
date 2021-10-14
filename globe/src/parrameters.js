import * as d3 from "d3";

import map from '../data/map.json';

import { feature } from 'topojson';

export const width=1000;
export const height=1000;
export const rotate = [0,0,0];

export const graticule = d3.geoGraticule();
export const projection = d3.geoOrthographic().scale(width/3.5).translate([width/3, height/3]).rotate(rotate);
export const path = d3.geoPath(projection);

export const world = feature(map, map.objects.collection);