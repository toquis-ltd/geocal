import React from 'react'

import { SettingsContext } from '../context/settings'

const VarifyPage: React.FC  = () => {
  const state = React.useContext(SettingsContext);
  return (
    <div>
      Number of dimention: {state.dimensions} <br/>
      Number of transformation: {state.transformations}<br/>
      Data output format: {state.dataOutputFormat}<br/>
      Output file: {state.outputFile}<br/>
    </div>
  )
}

export default VarifyPage