import React from 'react'

import { SettingStateType } from '../types/settings';
import {SettingsContext} from '../context/settings'

const VarifyPage: React.FC  = () => {
  const [state, useState] = React.useContext<[SettingStateType, VoidFunction]>(SettingsContext);

  return <div>About: {state.dataOutputFormat}</div>
}

export default VarifyPage