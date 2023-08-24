import React from 'react'
import { SettingOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';

import { SettingsContext } from '../context/settings';


import CRSelector from './CRSelector';

interface Props {
  index:number
}

const CRSItem : React.FC<Props> = ({index}) => {
  const settings = React.useContext<SettingStateType>(SettingsContext);
  const [isCRSelectorOpen, setCRSelectorState] = React.useState<boolean>(false);

  const onSelect = ( item : CRSModelType) => {
    const list = settings.transformationsItems;
    list.splice(index, 1, item);
    settings.setState({...settings, transformationsItems:list})
  }
  
  return (
    <Card
      actions={[
        <Button onClick={() => setCRSelectorState(true)}>
          <SettingOutlined key="setting" /> Change
        </Button>
      ]}>
        {
          (settings.transformationsItems[index] != undefined) ?
          <>
            <p><b>Name: </b> {settings.transformationsItems[index]?.name}</p>
            <p><b>{settings.transformationsItems[index]?.auth_name}:</b> {settings.transformationsItems[index]?.code}</p>
            <p><b>Type:</b> {settings.transformationsItems[index]?.type}</p>
            <p><b>Area of use:</b> {settings.transformationsItems[index]?.area_of_use_name.slice(0, 300)}...</p>
            {(settings.transformationsItems[index]?.projection_method_name) ? <p><b>Projection:</b> {settings.transformationsItems[index]?.projection_method_name}</p> : null}
          </>
          :
          <p>No CRS selected</p>
        }
      
      <CRSelector state={isCRSelectorOpen} setViewState={setCRSelectorState} onSelect={onSelect} />
    </Card>
  )
}

export default CRSItem