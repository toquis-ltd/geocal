import React from 'react';
import { Col, Row} from 'antd';

import { SettingsContext } from '../context/settings';

import BasicSettings from '../components/BasicSettings';

import CRSelectorContainer from '../assets/CRSelectorContainer';
import TransformationContainer from '../assets/TransformationContainer';

const Main : React.FC = () => {
  const CRState = React.useContext<SettingStateType>(SettingsContext);
  return (
    <div className="container" style={{margin:'auto', width:'90%', padding:'5px',}}>
      <div className="inner"></div>
        <Row gutter={[16, 32]} >
          <Col span={7}/>
          <Col span={10}>
            <BasicSettings />
          </Col>
          <Col span={7}/>
          <CRSelectorContainer transformationsNumber={CRState.transformationsNumber}/>
          <TransformationContainer />
        </Row>
      </div>
  )
}

export default Main