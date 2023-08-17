import React from 'react'
import { SettingOutlined } from '@ant-design/icons';

import { Card, Button } from 'antd';
import { CRSContext } from '../context/crs';


import CRSelector from './CRSelector';

const CRSItem : React.FC = () => {
  const [isCRSelectorOpen, setCRSelectorState] = React.useState<boolean>(false);
  const item = React.useContext<CRSListStateType>(CRSContext);
  const Open = () => {
    setCRSelectorState(true)
  }

  return (
    <Card 
    actions={[
      <Button onClick={Open}>
        <SettingOutlined key="setting" /> Change
      </Button>
    ]}>
      <p>{item.CRSList[0]?.name || 'No CRS selected'}</p>
      <CRSelector state={isCRSelectorOpen} setViewState={setCRSelectorState}  />
    </Card>
  )
}

export default CRSItem