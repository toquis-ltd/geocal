import React from 'react'
import { SettingOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';


import { CRSContext } from '../context/crs';
import { SettingsContext } from '../context/settings';


import CRSelector from './CRSelector';

interface Props {
  id:number
}
const CRSItem : React.FC = (props:Props) => {
  const item = React.useContext<CRSListStateType>(CRSContext);
  const settings = React.useContext<SettingStateType>(SettingsContext);
  const [isCRSelectorOpen, setCRSelectorState] = React.useState<boolean>(false);

  const onSelect = ( item : CRSModelType) => {
    const list = settings.transformationsItems;
    list.splice(props.id, 1, item);
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
          (settings.transformationsItems[props.id] != undefined) ?
          <>
            <p><b>Name: </b> {settings.transformationsItems[props.id]?.name}</p>
            <p><b>{settings.transformationsItems[props.id]?.auth_name}:</b> {settings.transformationsItems[props.id]?.code}</p>
            <p><b>Type:</b> {settings.transformationsItems[props.id]?.type}</p>
            <p><b>Area of use:</b> {settings.transformationsItems[props.id]?.area_of_use_name}</p>
            {(settings.transformationsItems[props.id]?.projection_method_name) ? <p><b>Projection:</b> {settings.transformationsItems[props.id]?.projection_method_name}</p> : null}
          </>
          :
          <p>No CRS selected</p>
        }
      
      <CRSelector state={isCRSelectorOpen} setViewState={setCRSelectorState} onSelect={onSelect} />
    </Card>
  )
}

export default CRSItem