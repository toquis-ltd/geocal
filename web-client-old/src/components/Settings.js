import React, {useState} from 'react';
import { setBounds } from './globe/D3';
import {ChangeCRS} from './popups/changeCRS/ChangeCRS';

function  CoordinateSystemSelector ({title, crs}) {
    const [isChanging, toggleChanging] = useState(false);
    const changeCRS = (e) => {
      crs.set(e);
      toggleChanging(false);
    }
    const detail = () => {
      const data = crs.get();
      if (JSON.stringify(data) === JSON.stringify({})) return null
      const bounds = {...data.bounds};
      return (
        <div className='selector__detail'>
          <p>ESPG: {data.code}</p>
          <p>Unit: {data.unityOfMeasure}</p>
          <div className='selector__bounds'>
              <h4>Area bounds in WGS 84:</h4>
                  <p>South latitude: {bounds.southBoundLat}</p>
                  <p>North latitude: {bounds.northBoundLat}</p>
                  <p>West longitude: {bounds.westBoundLon}</p>
                  <p>East longitude: {bounds.eastBoundLon}</p>
            </div>
        </div>  
      );
    }
    return (
      <div className='selector'>
       <ChangeCRS isOpen={isChanging} onClose={() => toggleChanging(false)} onSave={(e)=>changeCRS(e)}/>
        <div className='selector__header'>
          <h3 className="field-title">{title}</h3>
        </div>
        <div className='selector__container'>
          <button
            className="selector__btn"
            onClick={() => toggleChanging(true)}>
            {(crs.get().name) ? crs.get().name:'Click to select CRS'}
          </button>
        </div>
        <div className='selector__footer'>
          <a href={(crs.get().code) && `${process.env.REACT_APP_HOST}/about/crs/${crs.get().code}`}>More information</a>
          {detail()}
        </div>
    </div>
  );
}

function CheckBounds(sourceCRS, targetCRS){
      const sourceData = sourceCRS.get();
      if (JSON.stringify(sourceData) === JSON.stringify({})) return null
      const sourceBounds = {...sourceData.bounds};
      setBounds(sourceBounds)
      const targetData = targetCRS.get();
      if (JSON.stringify(targetData) === JSON.stringify({})) return null
      const targetBounds = {...targetData.bounds};
      

      //if east > west && north > south   --- they intersect
      if (sourceBounds.eastBoundLon > targetBounds.westBoundLon && sourceBounds.northBoundLat > targetBounds.southBoundLat){
        console.log(true)
        
      }
      else{
        console.log(false)
        alert("Selected systems do not intersect. This may cause problem / be ineffective")
      }
}

function ConversionSettings ({sourceCRS, targetCRS}) {
  console.log(sourceCRS)
  CheckBounds(sourceCRS, targetCRS)
  return (
    <div className="converter__settings">

      <CoordinateSystemSelector
        title='Source coordinate system'
        crs={sourceCRS}
      />
      
      <CoordinateSystemSelector
        title='Target coordinate system'
        crs={targetCRS}
      />

    </div>
  );
}


export default ConversionSettings;