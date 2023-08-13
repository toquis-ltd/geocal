import React from 'react'
import { Modal, Row, Col, Card, Button} from 'antd';

import { SettingsContext } from '../context/settings';

import Globe from './Globe';

interface Prop{
    state:bool
    setViewState:React.Dispatch<bool>
}

const AreaSelector : React.FC = (prop:Prop) => {
  const [coordinate, setCoordinate] = React.useState<CRSArea>({lat:0, long:0} as CRSArea)
  
  return (
    <Modal
        title="Select coordinate referance area"
        centered
        open={prop.state}
        footer={[<Button key="ok" type="primary" onClick={() => prop.setViewState(false)} children={'Ok'} />]}
        width={1000}>
        <Row gutter={[16, 32]} >
        <Col span={24}>
          <Card>
            <p><b>Latitude:</b>  {coordinate.lat.toFixed(2)}</p>
            <p><b>Longitude:</b>  {coordinate.long.toFixed(2)}</p>
          </Card>
        </Col>
        <Col span={7} />
        <Col span={10}>
          <Globe width={400} height={400} onSelect={e => setCoordinate(e)} />
        </Col>
        <Col span={7}/>
        </Row >
    </Modal>
  );
}

export default AreaSelector