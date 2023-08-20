import React from 'react'
import { Row, Col, Input, Button} from "antd";


const P2PTransformation : React.FC = () => {
  return (
    <div className="transform__point" style={{display:'flex', justifyContent:'center', }}>
          <div className="input__point">
              <Input />
              <Input />
              <Input />
          </div>
          <div className="transform__buttons" style={{display:'flex', flexDirection: 'column', margin:'auto 10px'}}>
              <Button type="primary">Transform</Button>
          </div>
          <div className="output__point">
              <Input />
              <Input />
              <Input />
          </div>
    </div>

)}

export default P2PTransformation