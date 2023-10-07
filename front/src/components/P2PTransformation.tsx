import React from 'react'
import {Input, Button, message} from "antd";
import {TransformedPoint} from '../api';

import { SettingsContext } from '../context/settings';

import { UnitEnum } from '../enums/crs';

interface PointCoordinateInput {
  x:string
  y:string
  z?:string
}

interface PointCoordinateInput {
  x:string
  y:string
  z?:string
}

const InputPlaceHolder = (item:CRSModelType) => {
  if (item?.unit === UnitEnum.DEGREE) {
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
  flexDirection: 'column',
  justifyContent:'center', 
  alignItems:'center'
};

const P2PTransformation : React.FC = () => {
  const settings = React.useContext<SettingStateType>(SettingsContext);

  const [input, setInput] = React.useState<PointCoordinateInput>({x:'', y:''})
  const [output, setOutput] = React.useState<PointCoordinateInput>({x:'', y:''})
  const inputHolders:string[] = InputPlaceHolder(settings.transformationsItems[0])
  const outputHolders:string[] = InputPlaceHolder(settings.transformationsItems[settings.transformationsNumber+1])

  const transformPoint = () => {
      setOutput({x:'Loading...', y:'Loading...' , z:'Loading...'});
      TransformedPoint(input, settings)
      .then(point => setOutput({x:point.x, y:point.y , z:point?.z}))
      .catch(() => {
        message.error('Transformation error, please verify input data', 3);
        setOutput({x:'', y:'' , z:''});
      });
  }
  
  React.useEffect(() => {
    setInput({...input, z:''});
    setOutput({...output, z:''});
  }, [settings.isHeightIncluded])

  return (
    <div className="transform__point" style={transformationStyle}>
          <div className="input__point" style={{
                                                display:'flex',
                                                flexDirection: 'column',
                                                alignItems:'center'
                                                }}>
              
              <div className="line" style={lineStyle}>
                <label htmlFor="x" style={{margin: 'auto 0px'}}>{inputHolders[0]}:</label>
                <Input
                      type='tel'
                      placeholder={inputHolders[0]}
                      value={input.x}
                      onChange={e => setInput({...input, x:e.target.value})} />
              </div>
              <div className="line" style={lineStyle}>
                <label htmlFor="y" style={{margin: 'auto 0px'}} >{inputHolders[1]}:</label>
                <Input
                      type='tel'
                      placeholder={inputHolders[1]}
                      value={input.y}
                      onChange={e => setInput({...input, y:e.target.value})}
                      />
              </div>
              <div className="line" style={lineStyle}>
                {(settings.isHeightIncluded) ?
                  <>
                  <label htmlFor="Height" style={{margin: 'auto 0px'}}>Height:</label>
                  <Input
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
          <div className="output__point" style={{
                                                display:'flex',
                                                flexDirection: 'column',
                                                alignItems:'center'
                                                }}>
              <div className="line" style={lineStyle}>
                <label htmlFor="x" style={{margin: 'auto 0px'}} >{outputHolders[0]}:</label>
                <Input
                      type='tel'
                      placeholder={outputHolders[0]}
                      value={output.x}
                      />
              </div>
              <div className="line" style={lineStyle}>
                <label htmlFor="y" style={{margin: 'auto 0px'}} >{outputHolders[1]}:</label>
                <Input
                      type='tel'
                      placeholder={outputHolders[1]}
                      value={output.y}
                      />
              </div>
              <div className="line" style={lineStyle}>
                {(settings.isHeightIncluded) ?
                  <>
                  <label htmlFor="Height" style={{margin: 'auto 0px'}}>Height:</label>
                  <Input
                          placeholder='Height'
                          value={output.z} />
                  </>
                  : null}
              </div>
          </div>
    </div>
)}

export default P2PTransformation