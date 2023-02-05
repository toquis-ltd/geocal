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
  const isUnity = useCRSUnity("source")[0] === "Latitude";
  
  const transform = useCallback(() =>{
    if (isSecondTransforming === false){
      FetchConvertion(source, target, {...points.source}, undefined).then(res=>pointHandle({...points, target:res}));
      return
    }
    FetchConvertion(source, target, {...points.source}, undefined)
    .then(res => {
      FetchConvertion(source, target1, {x:points.source.x, y:points.source.y, z:res.z.toString()}, undefined)
      .then(res1 => pointHandle({...points, target:res, target1:res1}));
    } )
  }, [source, points]);

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