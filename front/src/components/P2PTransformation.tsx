import React from 'react'
import { Input, Button, message} from "antd";
import {TransformedPoint} from '../api';

import { SettingsContext } from '../context/settings';

interface PointCoordinateInput {
  x:string
  y:string
  z?:string
}


const P2PTransformation : React.FC = () => {
  const settings = React.useContext<SettingStateType>(SettingsContext);

  const [input, setInput] = React.useState<PointCoordinateInput>({x:'100', y:'30'})
  const [output, setOutput] = React.useState<PointCoordinateInput>({x:'100', y:'30'})
  const [messageApi, contextHolder] = message.useMessage();

  const transformPoint = () => {
    try {
      TransformedPoint(input, settings)
      .then(point => setOutput({x:point.x, y:point.y , z:point?.z}))
    } finally {
      message.error('Transformation error, please verify input data', 7);
    }
  }
  
  React.useEffect(() => {
    setInput({...input, z:' '});
    setOutput({...output, z:' '});
  }, [settings.isHeightIncluded])

  return (
    <div className="transform__point" style={{display:'flex', justifyContent:'center'}}>
          <div className="input__point" style={{width:'20vw'}}>
              <Input value={input.x} onChange={e => setInput({...input, x:e.target.value})} />
              <Input value={input.y} onChange={e => setInput({...input, y:e.target.value})}/>
              {(settings.isHeightIncluded) ? <Input value={input.z} onChange={e => setInput({...input, z:e.target.value})}/>: null}
          </div>
          <div className="transform__buttons" style={{display:'flex', flexDirection: 'column', margin:'auto 10px'}}>
              <Button type="primary" onClick={transformPoint}>Transform</Button>
          </div>
          <div className="output__point" style={{width:'20vw'}}>
              <Input value={output.x}/>
              <Input value={output.y} />
              {(settings.isHeightIncluded) ? <Input value={output.z}/>: null}
          </div>
    </div>

)}

export default P2PTransformation