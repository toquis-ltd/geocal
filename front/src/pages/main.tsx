import React from 'react';
import { Col, Row} from 'antd';

import BasicSettings from '../components/BasicSettings';

import CRSelectorContainer from '../assets/CRSelectorContainer';
import TransformationContainer from '../assets/TransformationContainer';
import TransformationSelectorContainer from '../assets/TransformationSelectorContainer';

const Main : React.FC = () => {
  return (
    <div className="container" style={{margin:'auto', width:'90%', padding:'5px',}}>
      <div className="inner"></div>
        <Row gutter={[16, 32]} >
          <Col span={7}/>
          <Col span={10}>
            <BasicSettings />
          </Col>
          <Col span={7}/>
          <CRSelectorContainer/>
          <TransformationSelectorContainer/>
          <TransformationContainer />
        </Row>
      </div>
  )
}

export default Main