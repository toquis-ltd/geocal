import React from 'react'
import { Col, Row } from 'antd';

import BasicSettings from '../assets/BasicSettings';

const SettingsPage : React.FC = () => {
  return (
    <Row gutter={[8, 8]} style={{padding:'10px 5px', width:'100%', height:'100%'}}>
      <Col span={9}>
        <BasicSettings />
      </Col>
      <Col span={15}>
      </Col>
      <Col span={8}>
      </Col>
      <Col span={8}>
        <BasicSettings />
      </Col>
      <Col span={8}>
      </Col>
  </Row>
  )
}

export default SettingsPage