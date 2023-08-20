import React from 'react';
import { Col, Row , Tabs} from 'antd';

import { SettingsContext } from '../context/settings';

import BasicSettings from '../components/BasicSettings';
import FileUploader from '../components/UploadFile';
import P2PTransformation from '../components/P2PTransformation';


import CRSelectorContainer from '../assets/CRSelectorContainer';
import TransformationContainer from '../assets/TransformationContainer';

const Main : React.FC = () => {
  const CRState = React.useContext<SettingStateType>(SettingsContext);
  return (
    <div className="container" style={{margin:'auto', width:'90%', padding:'5px',}}>
      <div className="inner"></div>
        <Row gutter={[16, 32]} >
          {/* Row */}
          <Col span={7}/>
          <Col span={10}>
            <BasicSettings />
          </Col>
          <Col span={7}/>
          {/* RowEnd */}

          {/* Row */}
            <CRSelectorContainer transformationsNumber={CRState.transformationsNumber}/>
          {/* RowEnd */}
          <Col span={24}>
            <TransformationContainer />
          </Col>

        </Row>
      </div>
  )
}

export default Main