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

const { Content, Footer } = Layout;

function useStickyState<T>(defaultValue:T, key:string):[T, React.Dispatch<T>] {
  const [value, setValue] = React.useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null
      ? (JSON.parse(stickyValue) as T)
      : defaultValue;
  });
  return [value, setValue]
}

const App : React.FC = () => {
  const [state, setState] = useStickyState<SettingStateType>({
    isHeightIncluded:false,
    transformationsNumber: NumberOfTranfromationsEnum.One,
    dataOutputFormat: FormatVerificationOutputEnum.DecimalDegrees,
    outputFile: FileFormatEnum.geojson,
    transformationsItems: [],
    pipeIds:[0],
    areaOfUse: {lat:0.0, long:0.0, height:0.0},
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
    <Content style={{ margin: '20px 50px', backgroundColor: '#ffffff', borderRadius: "15px", minHeight: '70vh'}}>
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