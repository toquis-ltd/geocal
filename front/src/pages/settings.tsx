import React from 'react'
import { Col, Row } from 'antd';

import BasicSettings from '../assets/BasicSettings';

const SettingsPage : React.FC = () => {
  return (
    <Row gutter={[8, 8]} style={{padding:'10px 5px', width:'100%', height:'100%'}}>
      <Col span={10}>
        <BasicSettings />
      </Col>
      <Col span={14}>
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