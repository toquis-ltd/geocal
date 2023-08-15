import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from 'antd';

import Navbar from './assets/Navbar'

import TransformPage from './pages/transform';

import {SettingsContext} from './context/settings'
import {CRSContext} from './context/crs'

import {
  NumberOfTranfromationsEnum,
  FormatVerificationOutputEnum,
  FileFormatEnum
} from './enums/settings';

const { Content, Footer } = Layout;

const App : React.FC = () => {
  const [state, setState] = React.useState<SettingStateType>({
    isHeightIncluded:false,
    transformations: NumberOfTranfromationsEnum.One,
    dataOutputFormat: FormatVerificationOutputEnum.DecimalDegrees,
    outputFile: FileFormatEnum.geojson,
    areaOfUse: {lat:0.0, long:0.0},
    setState: () => {},
  }  as SettingStateType);
  
  const [CRState, setCRSList] = React.useState<CRSListStateType>({
    CRSList:[],
    setCRSList: () => {}
  } as CRSListStateType);

  return (
  <Layout className="layout">
    <Navbar/>
    <Content style={{ margin: '20px 50px', backgroundColor: '#ffffff', borderRadius: "15px", minHeight: '70vh'}}>
    <CRSContext.Provider value={{...CRState, setCRSList}}>
      <SettingsContext.Provider value={{...state, setState}}>
        <Routes>
            <Route path="/" Component={TransformPage} />
        </Routes>
      </SettingsContext.Provider>
      </CRSContext.Provider>
    </Content>
    <Footer style={{ textAlign: 'center' }}>TOQUIS - Mapless</Footer>
  </Layout>
  )
}

export default App;