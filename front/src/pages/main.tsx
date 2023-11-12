import React from 'react';
import { Row } from 'antd';

import BasicSettings from '../components/BasicSettings';

import CRSelectorContainer from '../assets/CRSelectorContainer';
import TransformationContainer from '../assets/TransformationContainer';
import TransformationSelectorContainer from '../assets/TransformationSelectorContainer';

const Main : React.FC = () => {
  return (
    <div 
          className="container" 
          style={{margin:'auto', width:'90%', padding:'5px'}}>
        <Row gutter={[16, 32]} >
          <BasicSettings />
          <TransformationContainer />
          <CRSelectorContainer/>
          <TransformationSelectorContainer/>
        </Row>
      </div>
  )
}

export default Main