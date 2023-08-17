import React from 'react'
import { Modal, Row, Col, Card, Button} from 'antd';

import { CRSContext } from '../context/crs';

import {GetCRSFromGeoPoint} from '../api'


import Globe from './Globe';

interface Props{
    state:boolean
    setViewState:React.Dispatch<boolean>
}

const AreaSelector : React.FC<Props> = (prop:Props) => {
  const [coordinate, setCoordinate] = React.useState<CRSArea>({lat:0, long:0} as CRSArea)
  const CRSItems = React.useContext<CRSListStateType>(CRSContext);
  
  const OnApply = () => {
    prop.setViewState(false)
    GetCRSFromGeoPoint(coordinate).then(res => {
      CRSItems.setCRSList({...CRSItems, CRSList:res});
    })
  }

  return (
    <Modal
        title="Select coordinate referance area"
        centered
        open={prop.state}
        onCancel={() => prop.setViewState(false)}
        footer={[<Button key="ok" type="primary" onClick={OnApply} children={'Apply'} />]}
        width={1000}>
        <Row gutter={[16, 32]}>
        <Col span={24}>
          <Card>
            <p><b>Latitude:</b>  {coordinate.lat.toFixed(5)}</p>
            <p><b>Longitude:</b>  {coordinate.long.toFixed(5)}</p>
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