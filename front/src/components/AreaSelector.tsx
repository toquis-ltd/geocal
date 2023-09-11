import React from 'react'

import { Modal, Row, Col, Card, Button} from 'antd';

import { CRSContext } from '../context/crs';

import Globe from './Globe';

import data from '../data/crs.json'

const DATA = data as CRSModelType[];

interface Props{
    state:boolean
    setViewState:React.Dispatch<boolean>
}

const onFilter = async (coordinate:PointCoordinate) => {
  const res = DATA.filter(e => (
                    e.area_bounds[0] < coordinate.long &&
                    e.area_bounds[2] > coordinate.long &&
                    e.area_bounds[1] < coordinate.lat &&
                    e.area_bounds[3] > coordinate.lat
    ))
  return res;
}

const AreaSelector : React.FC<Props> = (prop:Props) => {
  const [coordinate, setCoordinate] = React.useState<PointCoordinate>({lat:0, long:0} as PointCoordinate)
  const CRSItems = React.useContext<CRSListStateType>(CRSContext);
  
  const OnApply = () => {
    prop.setViewState(false)
    onFilter(coordinate).then(res => {
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
        <div style={{margin:'auto'}}>
          <Globe width={400} height={400} onSelect={e => setCoordinate(e)} />
        </div>
        </Row >
    </Modal>
  );
}

export default AreaSelector