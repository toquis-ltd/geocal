import React from 'react';
import { Col, Row } from 'antd';


import FileUploader from '../assets/UploadFile';

const TransformPage : React.FC = () => {

  return (
    <div className="container" style={{margin:'auto', width:'50%'}}>
      <div className="inner" style={{height: '200px'}}></div>
      <Row gutter={[8, 8]}>
        <Col span={3}>
        </Col>
        <Col span={18}>
          <FileUploader/>
        </Col>
        <Col span={3}>
        </Col>
      </Row>
    </div>
  )
}

export default TransformPage