import React, {useState} from 'react';

import {convert} from '../../tools/parse'
import {convertToDecimal} from '../../tools/format'

import {PointCoordinate} from './PointCoordinate';
import {ConversionButton} from './ConversionButton';

import {ShowErrorMessage} from './ConverterMessage'

const empty = {x: '', y: '', z: '' };
const clear = (handler) => handler({...empty});
const decimalPoint = point => ({
  x:convertToDecimal(point.x),
  y:convertToDecimal(point.y),
  z:convertToDecimal(point.z)
});

const isConvertable = (systems, point, handler) => {
  
  //Does target and source CRS are selected
  if (!systems.source.code || !systems.target.code) {
    handler({isShow:true, code:0});
    return false
  }
  //Source x and y coordinate are empty
  if (point.x.length === 0 || point.y.length === 0) {
    handler({isShow:true, code:1});
    return false
  }

  return true
}

const convertPoint = (systems, sourcePoint, handlers) => {
  const point = decimalPoint(sourcePoint);
  convert(systems.source.code, systems.target.code,
          point.x, point.y, point.z).then(event => handlers.target({...event}));
};

const addNewStory = (systems, points, push) => {               
  const story = {
    source: {
              crs:systems.source,
              point:decimalPoint(points.source)
            },
    target: { 
              crs:systems.target,
              point: points.target, 
            }
  };
  push(story);
};

const submit = (systems, point, handle) => {
  if (point.target.x !== '') {
    addNewStory(systems, point, handle.history);
    clear(handle.source);
    clear(handle.target);
    return;
  }
  if (isConvertable(systems, point.source, handle.error)) {
    convertPoint(systems, point.source, handle);
  }
}

function PointConverter ({sourceCRS, targetCRS, updateHistory, point}) {
  const [sourcePoint, setSourcePoint] = useState({...point});
  const [targetPoint, setTargetPoint] = useState({...empty});
  const [error, setError] = useState({isShow:false, code:undefined});
  
  const handleSubmit = event => {
    event.preventDefault();
    const systems = {source:sourceCRS, target:targetCRS};
    const points = {source:sourcePoint, target:targetPoint};
    const handlers = {source:setSourcePoint, target:setTargetPoint, error:setError, history:updateHistory};
    submit(systems, points, handlers);
  };

  return (
    <div className="converter__coordinate">
      <form onSubmit={(e) => handleSubmit(e)} method='GET'>
        <PointCoordinate
          source={{point:sourcePoint, unityOfMeasure:sourceCRS.unityOfMeasure, handler:(e)=>setSourcePoint(e)}}
          target={{point:targetPoint, unityOfMeasure:targetCRS.unityOfMeasure}}
        />
        <ConversionButton/>
      </form>
      <ShowErrorMessage error={error} onClose={()=>setError(false)}/>
    </div>
  )
}

export default PointConverter;