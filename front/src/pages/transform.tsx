import React from 'react';
import { Col, Row } from 'antd';

import { SettingsContext } from '../context/settings';

import BasicSettings from '../components/BasicSettings';
import FileUploader from '../components/UploadFile';
import P2PTransformation from '../components/P2PTransformation';


import CRSelectorContainer from '../assets/CRSelectorContainer'

const TransformPage : React.FC = () => {
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
            <CRSelectorContainer transformationsNum={CRState.transformationsNumber} />
          {/* RowEnd */}

          {/* Row */}
          <Col span={24}>
            <P2PTransformation />
          </Col>
          {/* RowEnd */}

          {/* Row */}
          <Col span={5} />
          <Col span={14}>
            <FileUploader/>
          </Col>
          <Col span={5} />
          {/* RowEnd */}
        </Row>
      </div>
  )
}

export default TransformPage