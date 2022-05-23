import {useCallback, useState, useEffect } from 'react';
import { DefaultRootState, useSelector } from 'react-redux';

import  Arrow  from 'icons/arrow-icon'
import FetchConvertion from 'calculation/conversion';
import useCRSUnity from 'hooks/useCRSUnity';

import { Input } from './input.jsx';
import { Output } from './output.jsx';

import './block.sass';

type Points = {
  source: Point,
  target: Point
  target1: Point
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
  const [points, pointHandle] = useState<Points>({source:{}, target:{}, target1:{}})
  const source = useSelector(({settings}:DefaultRootState)=>settings.source);
  const target = useSelector(({settings}:DefaultRootState)=>settings.target);
  const target1 = useSelector(({settings}:DefaultRootState)=>settings.target1);
  const proj = useSelector(({settings}:DefaultRootState)=>settings.transform?.wkt);
  const isSecondTransforming = useSelector(({settings}:DefaultRootState)=>settings.ST);
  const isUnity = useCRSUnity("source")[0] == "Latitude";
  
  const transform = useCallback(()=>{
    if (source !== undefined && target !== undefined) {
      let point = {...points.source};
      if (isUnity) {
        [point.x, point.y] = [point.y, point.x]
      }
      FetchConvertion(source, target, point).then(res=>pointHandle({...points, target:res})).then(()=> console.log(isUnity))
    }

  }, [source, target, points]);

  useEffect(()=>{
    if (target !== undefined && target1 !== undefined) {
      FetchConvertion(target, target1, points.target).then(res=>{pointHandle({...points, target1:res})})
    }
  }, [points.target])
  
  useEffect(()=>{
    onConvert.current = transform
  }, [onConvert, transform])

  return (
    <div className="point-converter__colomn">
      <Input point={points.source} onChange={pointHandle}/>
      <Arrow />
      <Output point={points.target}/>
      {
        isSecondTransforming &&
        <>
          <Arrow />
          <Output point={points.target1}/>
        </>
      }
    </div>
  )
};