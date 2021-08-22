import  Arrow  from 'icons/arrow-icon'

import { useState } from 'react';
import { Input } from './input';
import { Output } from './output';

import './block.sass';

type Points = {
  source: Point,
  target: Point
};

type Point = {
  x?: number
  y?: number
  z?: number
};

export function PointConverter () {
  const [points, usePointHandle] = useState<Points>({source:{}, target:{}})

  return (
    <div className="point-converter__colomn">
      <button className="fields__format-btn">format</button>
      <Input point={points.source} onChange={usePointHandle}/>
      <Arrow />
      <Output point={points.target}/>
    </div>
  )
};