import React from 'react'
import {Input, Button, message} from "antd";

import {getLastVisibleSelectedCRSIndex} from '../outils';
import {TransformedPoint} from '../api';
import { SettingsContext } from '../context/settings';
import { UnitEnum } from '../enums/crs';
import {isMobile} from 'react-device-detect';

interface PointCoordinate {
  x:string
  y:string
  z?:string
}

const InputPlaceHolder = (item:CRSModelType) => {
  if (item == undefined) return ['', '']
  if (item.unit === UnitEnum.DEGREE) {
    return ['Longitude', 'Latitude']
  }
  return ['X', 'Y']
}

const lineStyle:React.CSSProperties = {
  display:'grid', 
  gridTemplateColumns: '3fr 6fr',
  width:'15vw', 
  minWidth:'200px'
};

const transformationStyle:React.CSSProperties = {
  display:'flex',
  flexDirection: 'row',
  justifyContent:'center', 
  alignItems:'center'
};

const transformationStyleMobile:React.CSSProperties = {
  display:'flex',
  flexDirection: 'column',
  justifyContent:'center', 
  alignItems:'center'
};

const centerInputFieldStyle:React.CSSProperties = {
    display:'flex',
    flexDirection: 'column',
    alignItems:'center'
};

const P2PTransformation : React.FC = () => {
  const settings = React.useContext<SettingStateType>(SettingsContext);

  const [input, setInput] = React.useState<PointCoordinate>({x:'', y:''})
  const [output, setOutput] = React.useState<PointCoordinate>({x:'', y:''})

  const inputHolders:string[] = InputPlaceHolder(settings.transformationsItems[0])
  const outputHolders:string[] = InputPlaceHolder(
    settings.transformationsItems[getLastVisibleSelectedCRSIndex(settings)]
  );

  const transformPoint = () => {
      setOutput({x:'Loading...', y:'Loading...' , z:'Loading...'});
      TransformedPoint(input, settings)
      .then(point => setOutput({x:point.x, y:point.y , z:point?.z}))
      .catch(() => {
        message.error('Transformation error, please verify input data', 3);
        setOutput({x:'', y:'' , z:''});
      });
  };
  
  React.useEffect(() => {
    setInput({...input, z:''});
    setOutput({...output, z:''});
  }, [settings.isHeightIncluded])

  return (
    <form id="point_transformation" className="transform__point" style={(!isMobile) ? transformationStyle:transformationStyleMobile}>
          <div className="input__point" style={centerInputFieldStyle}>
              <div className="line" style={lineStyle}>
                <label htmlFor="in_x" style={{margin: 'auto 0px'}}>{inputHolders[0]}:</label>
                <Input
                      id='in_x'
                      type='tel'
                      placeholder={inputHolders[0]}
                      value={input.x}
                      onChange={e => setInput({...input, x:e.target.value})} />
              </div>
              <div className="line" style={lineStyle}>
                <label htmlFor="in_y" style={{margin: 'auto 0px'}} >{inputHolders[1]}:</label>
                <Input
                      id='in_y'
                      type='tel'
                      placeholder={inputHolders[1]}
                      value={input.y}
                      onChange={e => setInput({...input, y:e.target.value})}
                      />
              </div>
              <div className="line" style={lineStyle}>
                {(settings.isHeightIncluded) ?
                  <>
                  <label htmlFor="in_z" style={{margin: 'auto 0px'}}>Height:</label>
                  <Input
                          id='z'
                          type='tel'
                          placeholder='Height'
                          value={input.z} 
                          onChange={e => setInput({...input, z:e.target.value})}/>
                  </>
                  : null}
              </div>
          </div>
          <div className="transform__buttons" style={{margin:'10px auto'}}>
              <Button type="primary" onClick={transformPoint}>Transform</Button>
          </div>
          <div className="output__point" style={centerInputFieldStyle}>
              <div className="line" style={lineStyle}>
                <label htmlFor="out_x" style={{margin: 'auto 0px'}} >{outputHolders[0]}:</label>
                <Input
                      id='out_x'
                      type='tel'
                      placeholder={outputHolders[0]}
                      value={output.x}
                      />
              </div>
              <div className="line" style={lineStyle}>
                <label htmlFor="out_y" style={{margin: 'auto 0px'}} >{outputHolders[1]}:</label>
                <Input
                      id='out_y'
                      type='tel'
                      placeholder={outputHolders[1]}
                      value={output.y}
                      />
              </div>
              <div className="line" style={lineStyle}>
                {(settings.isHeightIncluded) ?
                  <>
                  <label htmlFor="out_z" style={{margin: 'auto 0px'}}>Height:</label>
                  <Input
                          id='out_z'
                          placeholder='Height'
                          value={output.z} />
                  </>
                  : null}
              </div>
          </div>
    </form>
)}

export default P2PTransformation