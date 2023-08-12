import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from 'antd';

import Navbar from './assets/Navbar'

import TransformPage from './pages/transform';

import {SettingsContext} from './context/settings'

import {
  TransformationDimentionEnum,
  NumberOfTranfromationsEnum,
  FormatVerificationOutputEnum,
  FileFormatEnum
} from './enums/settings';

const { Content, Footer } = Layout;

const App : React.FC = () => {
  const dec = FormatVerificationOutputEnum.DecimalDegrees;
  const [state, setState] = React.useState<SettingStateType>({
    isHeightIncluded:TransformationDimentionEnum.TwoDimentions,
    transformations: NumberOfTranfromationsEnum.One,
    dataOutputFormat: FormatVerificationOutputEnum.DecimalDegrees,
    outputFile: FileFormatEnum.geojson,
    setState: () => {},
  } as SettingStateType);

  return (
  <Layout className="layout">
    <Navbar/>
    <Content style={{ margin: '20px 50px', backgroundColor: '#ffffff', borderRadius: "15px", minHeight: '70vh'}}>
      <SettingsContext.Provider value={{...state, setState}}>
        <Routes>
            <Route path="/" Component={TransformPage} />
        </Routes>
      </SettingsContext.Provider>
    </Content>
    <Footer style={{ textAlign: 'center' }}>TOQUIS - Mapless</Footer>
  </Layout>
  )
}

export default App;