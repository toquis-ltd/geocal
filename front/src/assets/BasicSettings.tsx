import React from 'react'
import { Radio, Card, Select, Checkbox } from 'antd';

import { SettingsContext } from '../context/settings';

import {
  TransformationDimentionEnum,
  NumberOfTranfromationsEnum,
  FormatVerificationOutputEnum,
  FileFormatEnum
} from '../enums/settings';


const BasicSettings : React.FC = () => {
  const state = React.useContext<SettingStateType>(SettingsContext)

  const dimensionOptions = [
    { label: '2D', value: TransformationDimentionEnum.TwoDimentions},
    { label: '3D', value: TransformationDimentionEnum.ThreeDimentions},
  ];

  const transformationNumberOptions = [
    { label: '1', value:  NumberOfTranfromationsEnum.One},
    { label: '2', value:  NumberOfTranfromationsEnum.Two},
  ];

  const OutputFormatOptions =  Object.values(FormatVerificationOutputEnum)

  const outputFileOptions = Object.keys(FileFormatEnum)
                                  .map(key => ({ label: FileFormatEnum[key], value:key }));

  return (
    <Card title="Basic settings" headStyle={{ textAlign:'center' }} bodyStyle={{ backgroundColor:'#f5f5f5'}}>
          <div className="transformations-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Include height:</span>
            <Checkbox onChange={() => state.setState({...state, isHeightIncluded: !state.isHeightIncluded})} />
          </div>
          <div className="transformations-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Number of transformations:</span>
            <Radio.Group 
              value={state.transformations}  
              options={transformationNumberOptions}
              optionType="button"
              buttonStyle="solid"
              onChange={e => state.setState({...state, transformations:e.target.value} as SettingStateType)}
              />
          </div>
          <div className="transformations-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Output file format:</span>
              <Select options={outputFileOptions} value={state.outputFile} onChange={val => state.setState({...state, outputFile:val})} style={{ width: 300 }}/>
          </div>
    </Card>
  )
}

export default BasicSettings