import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from 'antd';

import Navbar from './assets/Navbar'

import VarifyPage from "./pages/verify";
import SettingsPage from "./pages/settings";
import TransformPage from './pages/transform';
import PreviewPage from "./pages/preview";

import {SettingsContext} from './context/settings'
import {SettingStateType} from './types/settings'

const { Content, Footer } = Layout;

const App : React.FC = () => {
  const [settings, setSettings] = React.useState<SettingStateType>({
    dimensions:2,
    transformations:1,
    dataOutputFormat:'Decimal Degrees',
  } as SettingStateType);

  return (
  <Layout className="layout">
    <Navbar/>
    <Content style={{ margin: '20px 50px', backgroundColor: '#ffffff', borderRadius: "15px", height: '70vh', minHeight: '70vh'}}>
      <SettingsContext.Provider value={[settings, setSettings]}>
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