import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from 'antd';

import Navbar from './assets/Navbar'

import VarifyPage from "./pages/verify";
import SettingsPage from "./pages/settings";
import TransformPage from './pages/transform';
import PreviewPage from "./pages/preview";

import {SettingsContext} from './context/settings'

import {
  TransformationDimentionEnum,
  NumberOfTranfromationsEnum,
  FormatVerificationOutputEnum,
  FileFormatEnum
} from './enums/settings';

const { Content, Footer } = Layout;

const App : React.FC = () => {
  const [state, setState] = React.useState<SettingStateType>({
    dimensions:TransformationDimentionEnum.TwoDimentions,
    transformations: NumberOfTranfromationsEnum.One,
    dataOutputFormat: FormatVerificationOutputEnum.DecimalDegrees,
    outputFile: FileFormatEnum.shp,
    setState: () => {},
  } as SettingStateType);

  return (
  <Layout className="layout">
    <Navbar/>
    <Content style={{ margin: '20px 50px', backgroundColor: '#ffffff', borderRadius: "15px", minHeight: '70vh'}}>
      <SettingsContext.Provider value={{...state, setState}}>
        <Routes>
            <Route path="/" Component={PreviewPage} />        
            <Route path="/settings" Component={SettingsPage} />
            <Route path="/verify" Component={VarifyPage} />
            <Route path="/transform" Component={TransformPage} />
        </Routes>
      </SettingsContext.Provider>
    </Content>
    <Footer style={{ textAlign: 'center' }}>TOQUIS - Mapless</Footer>
  </Layout>
  )
}

export default App;