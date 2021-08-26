import { DefaultRootState, useSelector } from 'react-redux';

import  Arrow  from 'icons/arrow-icon'
import FetchConvertion from 'calculation/conversion';

import { useState, useEffect } from 'react';
import { Input } from './input';
import { Output } from './output';

import './block.sass';

type Points = {
  source: Point,
  target: Point
};

type Point = {
  x?: string
  y?: string
  z?: string
};

type Prop = {
  state:boolean
}

export function PointConverter ({state}:Prop) {
  const [points, pointHandle] = useState<Points>({source:{}, target:{}})
  const source = useSelector(({settings}:DefaultRootState)=>settings.source.proj4);
  const target = useSelector(({settings}:DefaultRootState)=>settings.target.proj4);
  
  useEffect(()=>{
    if (state && source !== undefined && target !== undefined) {
      pointHandle({...points, target:FetchConvertion(source+'', target+'', points.source)})
    }
  }, [state, points, source, target])

  return (
    <div className="point-converter__colomn">
      <button className="base__button fields__format-btn">format</button>
      <Input point={points.source} onChange={pointHandle}/>
      <Arrow />
      <Output point={points.target}/>
    </div>
  )
};