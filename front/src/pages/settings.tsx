import React from 'react'
import {  Radio } from 'antd';

const SettingsPage : React.FC = () => {
  return (
    <Radio.Group>
      <Radio.Button>2D</Radio.Button>
      <Radio.Button>3D</Radio.Button>
    </Radio.Group>
  )
}

export default SettingsPage