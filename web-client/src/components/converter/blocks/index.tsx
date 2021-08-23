import  Arrow  from 'icons/arrow-icon'

import { useState, useEffect } from 'react';
import { Input } from './input';
import { Output } from './output';

import './block.sass';

type Points = {
  source: Point,
  target: Point
};

type Point = {
  x?: number | String
  y?: number | String
  z?: number | String
};

type Prop = {
  state:boolean
}

export function PointConverter ({state}:Prop) {
  const [points, pointHandle] = useState<Points>({source:{}, target:{}})
  const FetchConvertion = ():Point => {
    return points.source.x ? points.source : {}
  }
  useEffect(()=>{
    if (state) {
      pointHandle({...points, target:FetchConvertion()})
    }
  }, [state])
  return (
    <div className="point-converter__colomn">
      <button className="base__button fields__format-btn">format</button>
      <Input point={points.source} onChange={pointHandle}/>
      <Arrow />
      <Output point={points.target}/>
    </div>
  )
};