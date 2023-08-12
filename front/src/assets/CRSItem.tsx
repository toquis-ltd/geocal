import React from 'react'
import { Card } from 'antd';

import { SettingsContext } from '../context/settings';

import {
  TransformationDimentionEnum,
  NumberOfTranfromationsEnum,
  FormatVerificationOutputEnum,
  FileFormatEnum
} from '../enums/settings';


const CRSItem : React.FC = () => {
  
  return (
    <Card>
      <p> EPSG:4326 </p> 
    </Card>
  )
}

export default CRSItem