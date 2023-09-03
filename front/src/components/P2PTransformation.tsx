import React from 'react'
import {Input, Button, message} from "antd";
import {TransformedPoint} from '../api';

import { SettingsContext } from '../context/settings';

import { PJEnum } from '../enums/crs';

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
  if (item?.type === PJEnum.GEOGRAPHIC_2D_CRS || item?.type === PJEnum.GEOGRAPHIC_3D_CRS) {
    return ['Latitude', 'Longitude']
  }
  return ['X', 'Y']
}

const P2PTransformation : React.FC = () => {
  const settings = React.useContext<SettingStateType>(SettingsContext);

  const [input, setInput] = React.useState<PointCoordinateInput>({x:'', y:''})
  const [output, setOutput] = React.useState<PointCoordinateInput>({x:'', y:''})
  const holders:string[] = InputPlaceHolder(settings.transformationsItems[0])

  const transformPoint = () => {
      setOutput({x:'Loding...', y:'Loding...' , z:'Loding...'})
      TransformedPoint(input, settings)
      .then(point => setOutput({x:point.x, y:point.y , z:point?.z}))
      .catch(() => message.error('Transformation error, please verify input data', 3));
  }
  
  React.useEffect(() => {
    setInput({...input, z:''});
    setOutput({...output, z:''});
  }, [settings.isHeightIncluded])

  return (
    <div className="transform__point" style={{display:'flex', justifyContent:'center'}}>
          <div className="input__point" style={{width:'20vw'}}>
              <div className="line" style={{display:'flex', justifyContent:'center'}}>
                <label htmlFor="x" style={{margin:'auto'}}>{holders[0]}:</label>
                <Input 
                      style={{width:'70%'}}
                      placeholder={holders[0]}
                      value={input.x}
                      onChange={e => setInput({...input, x:e.target.value})} />
              </div>
              <div className="line" style={{display:'flex', justifyContent:'center'}}>
                <label htmlFor="y" style={{margin:'auto'}}>{holders[1]}:</label>
                <Input 
                      style={{width:'70%'}} 
                      placeholder={holders[1]}
                      value={input.y}
                      onChange={e => setInput({...input, y:e.target.value})}
                      />
              </div>
              <div className="line" style={{display:'flex', justifyContent:'center'}}>
              {(settings.isHeightIncluded) ?
                <>
                <label htmlFor="Height" style={{margin:'auto'}}>Height:</label>
                <Input 
                        style={{width:'70%'}} 
                        placeholder='Height'
                        value={input.z} 
                        onChange={e => setInput({...input, z:e.target.value})}/>
                </>
                : null}
              </div>
          </div>
          <div className="transform__buttons" style={{display:'flex', flexDirection: 'column', margin:'auto 10px'}}>
              <Button type="primary" onClick={transformPoint}>Transform</Button>
          </div>
          <div className="output__point" style={{width:'20vw'}}>
              <Input value={output.x}/>
              <Input value={output.y}/>
              {(settings.isHeightIncluded) ? <Input value={output.z}/>: null}
          </div>
    </div>

)}

export default P2PTransformation