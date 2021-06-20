import React, {useState, useEffect} from 'react';
import OutputCoordinateField  from './fields/Output';
import { MapPointCase } from './Maps';
import {convert} from '../tools/parse'
import Dropdown from './Dropdown'

function StoryCase({source, target, element}){
  const [isActivate, toggleActivate] = useState(false);
  const [pointOnMap, setPoint] = useState();
  var copyLink = (`${process.env.REACT_APP_HOST}/converter/?s_crs=${source.crs.code}&t_crs=${target.crs.code}`);
  
  useEffect(() => {
    const deglist = ['degree', 'unknown', 'sexagesimal', ' DMS.s'];

    if (!deglist.includes(source.unityOfMeasure)){
      convert(source.crs.code,
        4326,
        source.point.y,
        source.point.x, 
        source.point.z).then((e) => setPoint({lat:e.x, lng:e.y}));
    }else{
      convert(source.crs.code,
        4326,
        source.point.x,
        source.point.y, 
        source.point.z).then((e) => setPoint({lat:e.x, lng:e.y}));
    }
    
    
  }, [])

  return (
    <div className={`accordion accordion--${(isActivate) ? 'activate' : 'deactivate'}`}>

      <div className='accordion__header'>
        <button className="accordion__btn accordion__open-btn" onClick={() => toggleActivate(!isActivate)}>{source.crs.name} → {target.crs.name}</button>
      
        {/* <Dropdown title = "Share" link = {copyLink}/>
        <button className="accordion__btn accordion__remove-btn" onClick = {() => console.log(element)}>🗑️</button> */}
      </div>

      <div className={`accordion__container  accordion__container--${(isActivate) ? 'activate' : 'deactivate'}`}>

        <div className="accordion__row">

          <OutputCoordinateField
                                className="source__coordinate"
                                point={source.point}
          />

          { (pointOnMap !== undefined) && <MapPointCase position={pointOnMap}/> }

          <OutputCoordinateField
                                className="target__coordinate"
                                point={target.point}
          />
        </div>
      </div>
    </div>
  ); 
}

function Stories({history}){
  return (
    <div className="converter__history">
      <div className='history__header'> 
        <h2 className="history__title">History of conversion</h2>
      </div>
      <div className='history__container'>
        {history.map((element, i) => {
          element = JSON.parse(element);
          return (
                  <StoryCase
                                  id={i}
                                  key={history.length-i}
                                  source={element.source}
                                  target={element.target}

                  />
                )
        })}
      </div>
    </div>
  );
}

export default Stories