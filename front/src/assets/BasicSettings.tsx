import React from 'react'
import { Radio, Card } from 'antd';

import {SettingsContext} from '../context/settings';
import {SettingStateType} from '../types/settings';

const BasicSettings : React.FC = () => {
  const [state, setState] = React.useContext<[SettingStateType, VoidFunction]>(SettingsContext);
  
  const dimensionOptions = [
    { label: '2D', value: 2},
    { label: '3D', value: 3},
  ];

  const transformationNumberOptions = [
    { label: 'One transformation', value: 1},
    { label: 'Two transformations', value: 2},
  ];

  const OutputFormatOptions = [
    { label: 'Decimal Degrees', value: 'Decimal Degrees'},
    { label: 'Degrees Minutes', value: 'Degrees Minutes'},
    { label: 'Degrees Minutes Seconds', value: 'Degrees Minutes Seconds'},
  ];
  return (
    <Card title="Basic settings" headStyle={{ textAlign:'center' }} bodyStyle={{ backgroundColor:'#f5f5f5'}}>
          <div className="dimention-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Number of dimention:</span>
            <Radio.Group
              value={state.dimensions}
              options={dimensionOptions}
              optionType="button"
              buttonStyle="solid"
              onChange={e => setState({...state, dimensions:e.target.value})}
              />
          </div>
          <div className="transformations-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Number of transformation:</span>
            <Radio.Group 
              value={state.transformations}  
              options={transformationNumberOptions}
              optionType="button"
              buttonStyle="solid"
              onChange={e => setState({...state, transformations:e.target.value})}
              />
          </div>
          <div className="transformations-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Data output format:</span>
            <Radio.Group 
              value={state.dataOutputFormat}  
              options={OutputFormatOptions}
              optionType="button"
              buttonStyle="solid"
              onChange={e => setState({...state, dataOutputFormat:e.target.value})}
              />
          </div>
    </Card>
  )
}

export default BasicSettings