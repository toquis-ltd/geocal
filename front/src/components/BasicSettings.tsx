import React from 'react'
import { Radio, Card, Select, Checkbox, Col } from 'antd';

import { SettingsContext } from '../context/settings';

import {
  NumberOfTranfromationsEnum,
  FileFormatEnum
} from '../enums/settings';


const BasicSettings : React.FC = () => {
  const state = React.useContext<SettingStateType>(SettingsContext)
  
  const transformationNumberOptions = [
    { label: '1', value:  NumberOfTranfromationsEnum.One},
    { label: '2', value:  NumberOfTranfromationsEnum.Two},
  ];
  
  const outputFileOptions = Object.keys(FileFormatEnum).map(key => ({
    label: FileFormatEnum[key as keyof typeof FileFormatEnum],
    value: key as keyof typeof FileFormatEnum
  }));

  return (
    <Col span={24}>
    <Card 
          title="Geodetic calculator"
          style={{ minWidth:'300px', width:'30vw', margin:'auto', }}
          headStyle={{ textAlign:'center' }} 
          bodyStyle={{ padding:'15px'}}>
          
          <div className="transformations-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Elevation/Z:</span>
            <Checkbox checked={state.isHeightIncluded} onChange={() => state.setState({...state, isHeightIncluded: !state.isHeightIncluded})} />
          </div>
          <div className="transformations-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Number of transformations:</span>
            <Radio.Group 
              value={state.transformationsNumber}
              options={transformationNumberOptions}
              optionType="button"
              buttonStyle="solid"
              onChange={e => state.setState({...state, transformationsNumber:e.target.value} as SettingStateType)}
              />
          </div>
          <div className="transformations-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Output file format:</span>
              <Select 
                      options={outputFileOptions}
                      value={state.outputFile}
                      onChange={val => state.setState({...state, outputFile:val})} 
                      style={{maxWidth: '100px', minWidth: '40%' }}/>
          </div>
    </Card>
    </Col>
  )
}

export default BasicSettings