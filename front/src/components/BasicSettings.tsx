import React from 'react'
import { Radio, Card, Select, Checkbox, Col } from 'antd';

import { SettingsContext } from '../context/settings';
import { UnitEnum } from '../enums/crs';

import {
  NumberOfTranfromationsEnum,
  FileFormatEnum,
  ResultFormatEnum
} from '../enums/settings';


type OptionType<T>  = {
   label: T[keyof T], 
   value: keyof T,
};

function getOptions<T extends {}>(e:T):OptionType<T>[] {
  return Object.keys(e).map(key => ({
    label: e[key as keyof typeof e],
    value: key as keyof typeof e
  }));
}

const BasicSettings : React.FC = () => {
  const settings = React.useContext<SettingStateType>(SettingsContext)
  
  const transformationNumberOptions =  [
    { label: '1', value:  NumberOfTranfromationsEnum.One},
    { label: '2', value:  NumberOfTranfromationsEnum.Two},
  ];
  const outputFileOptions = getOptions(FileFormatEnum);
  const resultOutputOptions = getOptions(ResultFormatEnum);

  const isOutputFormatSelectionAllowed = () => {
    const isShow = (settings.transformationsItems.length>1 &&
                    [UnitEnum.DEGREE, UnitEnum.GRAD].includes(settings.transformationsItems[settings.transformationsItems.length-1].unit))
    if (!isShow && settings.dataOutputFormat !== ResultFormatEnum.DD) {
      settings.setState({...settings, dataOutputFormat:ResultFormatEnum.DD})
    }
    return isShow
  }
  
  return (
    <Col span={24}>
    <Card 
          title="Geodetic calculator"
          style={{ minWidth:'300px', width:'30vw', margin:'auto', }}
          headStyle={{ textAlign:'center' }} 
          bodyStyle={{ padding:'5px 10px 15px 10px',  height:'160px'}}>
          
          <div className="transformations-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Elevation/Z:</span>
            <Checkbox checked={settings.isHeightIncluded} onChange={() => settings.setState({...settings, isHeightIncluded: !settings.isHeightIncluded})} />
          </div>
          <div className="transformations-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Number of transformations:</span>
            <Radio.Group 
              value={settings.transformationsNumber}
              options={transformationNumberOptions}
              optionType="button"
              buttonStyle="solid"
              onChange={e => settings.setState({...settings, transformationsNumber:e.target.value} as SettingStateType)}
              />
          </div>
          <div className="transformations-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Output file format:</span>
              <Select 
                      options={outputFileOptions}
                      value={settings.outputFile}
                      onChange={val => settings.setState({...settings, outputFile:val})} 
                      style={{maxWidth: '100px', minWidth: '40%' }}/>
          </div>
          {(isOutputFormatSelectionAllowed()) ? 
          <div className="transformations-settings" style={{margin:'5px'}}>
          <span className="label" style={{marginRight:'5px'}}>Result field format:</span>
            <Select
                    options={resultOutputOptions}
                    value={settings.dataOutputFormat}
                    onChange={val => settings.setState({...settings, dataOutputFormat:val})}
                    style={{maxWidth: '100px', minWidth: '40%' }}/>
        </div>:null
        }
    </Card>
    </Col>
  )
}

export default BasicSettings