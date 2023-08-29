import React from 'react'
import { Radio, Card, Select, Checkbox, Button } from 'antd';

import { SettingsContext } from '../context/settings';

import {
  NumberOfTranfromationsEnum,
  FileFormatEnum
} from '../enums/settings';

import AreaSelector from './AreaSelector'

const BasicSettings : React.FC = () => {
  const state = React.useContext<SettingStateType>(SettingsContext)
  const [isAreaSelectorOpen, setAreaSelectorState] = React.useState<boolean>(false);
  
  const transformationNumberOptions = [
    { label: '1', value:  NumberOfTranfromationsEnum.One},
    { label: '2', value:  NumberOfTranfromationsEnum.Two},
  ];
  
  const outputFileOptions = Object.keys(FileFormatEnum).map(key => ({
    label: FileFormatEnum[key as keyof typeof FileFormatEnum],
    value: key as keyof typeof FileFormatEnum
  }));

  return (
    <Card title="Geodetic calculator" headStyle={{ textAlign:'center' }} bodyStyle={{ backgroundColor:'#f5f5f5'}}>
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
              <Select options={outputFileOptions} value={state.outputFile} onChange={val => state.setState({...state, outputFile:val})} style={{ width: 300 }}/>
          </div>
          <div className="transformations-settings" style={{margin:'5px', textAlign:'center'}}>
            <Button type="primary" onClick={() => setAreaSelectorState(true)}>
                Open area selector
            </Button>
            <AreaSelector state={isAreaSelectorOpen} setViewState={setAreaSelectorState} />
          </div>
    </Card>
  )
}

export default BasicSettings