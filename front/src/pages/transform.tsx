import React from 'react';
import { Col, Row } from 'antd';

import { SettingsContext } from '../context/settings';

import BasicSettings from '../assets/BasicSettings';
import CRSItem from '../assets/CRSItem';
import FileUploader from '../assets/UploadFile';
import P2PTransformation from '../assets/P2PTransformation';
import {NumberOfTranfromationsEnum} from '../enums/settings';

interface CRSItemProps{
  transformations:NumberOfTranfromationsEnum
}

const CRSItems:React.FC = (props:CRSItemProps) => {
  
  return (
  <>
      { (props.transformations===NumberOfTranfromationsEnum.One) ? 
        <>
        <Col span={3} />
        <Col span={7}>
          <CRSItem />
        </Col>
        <Col span={4}/>
        <Col span={7}>
            <CRSItem />
        </Col>
        <Col span={3}/>
        </> : 
        <>
        <Col span={1} />
        <Col span={6}>
          <CRSItem />
        </Col>
        <Col span={2} />
        <Col span={6} >
          <CRSItem />
        </Col>
        <Col span={2} />
        <Col span={6}>
            <CRSItem />
        </Col>
        <Col span={1}/>
        </> 
      }
  </>
  )
}

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
            <CRSItems transformations={CRState.transformations} />
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