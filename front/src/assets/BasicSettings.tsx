/// <reference path="./src/@types/global.d.ts" />

import React from 'react'
import { Radio, Card, Select } from 'antd';

import { SettingsContext } from '../context/settings';
import {
  TransformationDimentionEnum,
  NumberOfTranfromationsEnum,
  FormatVerificationOutputEnum,
  FileFormatEnum
} from '../enums/settings';


const BasicSettings : React.FC = () => {
  const state = React.useContext<SettingStateType>(SettingsContext)

  const dimensionOptions = [
    { label: '2D', value: TransformationDimentionEnum.TwoDimentions},
    { label: '3D', value: TransformationDimentionEnum.ThreeDimentions},
  ];
  const transformationNumberOptions = [
    { label: 'One transformation', value:  NumberOfTranfromationsEnum.One},
    { label: 'Two transformations', value:  NumberOfTranfromationsEnum.Two},
  ];

  const OutputFormatOptions =  Object.keys(FormatVerificationOutputEnum)
                                              .filter((value => isNaN(Number(value)) === false))
                                              .map(key => ({ label: FormatVerificationOutputEnum[key], value:key }));
  //  [
  //   { label: 'Decimal Degrees', value: FormatVerificationOutputEnum.DecimalDegrees},
  //   { label: 'Degrees Minutes', value: FormatVerificationOutputEnum.DegreesMinutes},
  //   { label: 'Degrees Minutes Seconds', value: FormatVerificationOutputEnum.DegreesMinutesSeconds},
  // ];

  const outputFileOptions=[
    { label: 'Shapefile (.shp)', value: 'shp'},
    { label: 'CSV (.csv)', value: 'csv'},
    { label: 'GeoJSON (.geojson)', value: 'geojson'},
    { label: 'Keyhole Markup Language (.kml)', value: 'kml'},
    { label: 'Geographic Markup Language (.gml)', value: 'gml'},
    { label: 'GPS Exchange Format (.gpx)', value: 'gpx'},
    { label: 'GeoTIFF (.tif)', value: 'tif'},
    { label: 'NetCDF (.nc)', value: 'nc'},
  ]

  return (
    <Card title="Basic settings" headStyle={{ textAlign:'center' }} bodyStyle={{ backgroundColor:'#f5f5f5'}}>
          <div className="transformations-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Number of dimention:</span>
            <Radio.Group
              value={state.dimensions}
              options={dimensionOptions}
              optionType="button"
              buttonStyle="solid"
              onChange={e => state.setState({...state, dimensions:e.target.value})}
              />
          </div>
          <div className="transformations-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Number of transformation:</span>
            <Radio.Group 
              value={state.transformations}  
              options={transformationNumberOptions}
              optionType="button"
              buttonStyle="solid"
              onChange={e => state.setState({...state, transformations:e.target.value} as SettingStateType)}
              />
          </div>
          <div className="transformations-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Data output format:</span>
            <Radio.Group 
              value={state.dataOutputFormat}  
              options={OutputFormatOptions}
              optionType="button"
              buttonStyle="solid"
              onChange={e => state.setState({...state, dataOutputFormat:e.target.value})}
              />
          </div>
          <div className="transformations-settings" style={{margin:'5px'}}>
            <span className="label" style={{marginRight:'5px'}}>Output file format:</span>
            <Select options={outputFileOptions} value={state.outputFile} onChange={val => state.setState({...state, outputFile:val})} style={{ width: 300 }}/>
          </div>
    </Card>
  )
}

export default BasicSettings