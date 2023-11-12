import React from 'react'
import { SettingOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
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
  };

  const onDelete = () => {
    const withoutItem = settings.transformationsItems;
    withoutItem.splice(index, 1)
    settings.setState({...settings, transformationsItems:withoutItem});
  };

  return (
    <Card
      actions={[
        <Button onClick={() => setCRSelectorState(true)}>
          <SettingOutlined key="setting" /> Change
        </Button>,
        <Button onClick={()=>null}>
          <InfoCircleOutlined />  About
        </Button>,
        <Button onClick={onDelete}>
          <DeleteOutlined />  Delete
        </Button>,
      ]}>
        {
          (settings.transformationsItems[index] != undefined) ?
          <>
            <p><b>Name: </b> {settings.transformationsItems[index]?.name}</p>
            <p><b>{settings.transformationsItems[index]?.auth_name}:</b> {settings.transformationsItems[index]?.code}</p>
            <p><b>Unit:</b> {settings.transformationsItems[index]?.unit}</p>
            <p><b>Type:</b> {settings.transformationsItems[index]?.type}</p>
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