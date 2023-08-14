import React from 'react'
import { Modal, Row, Col, Button, List} from 'antd';

import {CRSContext} from '../context/crs';

interface Props{
    state:boolean
    setViewState:React.Dispatch<boolean>
}

const CRSelector : React.FC<Props> = (prop:Props) => {
  const CRState = React.useContext<CRSListStateType>(CRSContext)

  const OnApply = () => {
    prop.setViewState(false)
  };

  return (
    <Modal
        title="Select coordinate referance area"
        centered
        open={prop.state}
        onCancel={() => prop.setViewState(false)}
        footer={[]}
        width={800}
        bodyStyle={{maxHeight:'50vh', overflow:'auto', overflowX:'hidden' }}>

        <List
          dataSource={CRState.CRSList}
          style={{padding:'10px'}}
          renderItem={(item) => (
            <List.Item key={item.auth_name + item.code}>
              <div className="item">
                <p><b>Name: </b> {item.name}</p>
                <p><b>Authority: </b> {item.auth_name}</p>
                <p><b>ID Code: </b> {item.code}</p>
                <p><b>Authority: </b> {item.area_of_use_name}</p>
                <p><b>Type:</b> {item.type}</p>
                <p><b>Projection:</b> {item.projection_method_name}</p>
              </div>
            </List.Item>
          )}
        />

        <Row gutter={[16, 32]}>
            <Col span={7} />
            <Col span={10}>
            </Col>
            <Col span={7}/>
        </Row >
    </Modal>
  );
}

export default CRSelector