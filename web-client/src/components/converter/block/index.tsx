import {useCallback, useState, useEffect } from 'react';
import { DefaultRootState, useSelector } from 'react-redux';

import  Arrow  from 'icons/arrow-icon'
import FetchConvertion from 'calculation/conversion';

import { Input } from './input.jsx';
import { Output } from './output.jsx';

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
type Props = {
  onConvert: {
    current: Function | null
  } 
}

export function PointConverter ({onConvert}:Props) {
  const [points, pointHandle] = useState<Points>({source:{}, target:{}})
  const source = useSelector(({settings}:DefaultRootState)=>settings.source);
  const target = useSelector(({settings}:DefaultRootState)=>settings.target);
  const transform = useCallback(()=>{
    if (source !== undefined && target !== undefined) {
      FetchConvertion(source, target, points.source).then(res=>{
        pointHandle({...points, target:res})
      })
    }
  }, [source, target, points]);

  useEffect(()=>{
    onConvert.current = transform
  }, [onConvert, transform])

  return (
    <div className="point-converter__colomn">
      <Input point={points.source} onChange={pointHandle}/>
      <Arrow />
      <Output point={points.target}/>
    </div>
  )
};