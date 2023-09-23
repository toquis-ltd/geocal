import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from 'antd';

import Navbar from './components/Navbar'

import Main from './pages/main';

import {SettingsContext} from './context/settings'
import {CRSContext} from './context/crs'

import {
  NumberOfTranfromationsEnum,
  FormatVerificationOutputEnum,
  FileFormatEnum
} from './enums/settings';

import {useStickyState} from './hooks';

const { Content, Footer } = Layout;

const AppStyle = { 
    margin: '20px 5px', 
    backgroundColor: 'rgb(245 245 245)',
    borderRadius: "15px",
    minHeight: '70vh'
}

const App : React.FC = () => {
  const [state, setState] = useStickyState<SettingStateType>({
    isHeightIncluded:false,
    transformationsNumber: NumberOfTranfromationsEnum.One,
    dataOutputFormat: FormatVerificationOutputEnum.DecimalDegrees,
    outputFile: FileFormatEnum.csv,
    transformationsItems: [],
    pipeIds:[0, 0],
    setState: () => {},
  }  as SettingStateType, 'AppState');
  
  const [CRState, setCRSList] = useStickyState<CRSListStateType>({
    CRSList:[],
    setCRSList: () => {}
  } as CRSListStateType, 'Find');
  
  React.useEffect(() => {
    localStorage.setItem('AppState', JSON.stringify(state));
    localStorage.setItem('Find', JSON.stringify(CRState));
  }, [state, CRState]);
  
  return (
  <Layout className="layout">
    <Navbar/>
    <Content style={AppStyle}>
    <CRSContext.Provider value={{...CRState, setCRSList}}>
      <SettingsContext.Provider value={{...state, setState}}>
        <Routes>
            <Route path="/" Component={Main} />
        </Routes>
      </SettingsContext.Provider>
      </CRSContext.Provider>
    </Content>
    <Footer style={{ textAlign: 'center' }}>TOQUIS - Mapless</Footer>
  </Layout>
  )
}

export default App;