import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout, Alert, Space } from 'antd';

import Navbar from './components/Navbar'

import Main from './pages/main';

import {SettingsContext} from './context/settings'
import {CRSContext} from './context/crs'

import {
  NumberOfTranfromationsEnum,
  FileFormatEnum,
  ResultFormatEnum
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
    dataOutputFormat: ResultFormatEnum.DD,
    outputFile: FileFormatEnum.csv,
    transformationsItems: [],
    pipeIds:[0, 0, 0],
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
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert
        showIcon={false}
        description={
        <p style={{textAlign:'center'}}>
          <a target="_blank"
             href="https://docs.google.com/forms/d/e/1FAIpQLSdvxIfdqhPLp1ltSl-eyweUVBkoh29l9K5GhWWfUwfPBAqRGQ/viewform?usp=sf_link"
            > Your feedback is incredibly important to us as we strive to enhance Mapless. <br/>
              You can propose any additional features or report any bugs. <br/>
          </a>
             It takes 3 minutes to complete our form or you can contact us directly at  <a href="mailto: feedback@toquis.com">feedback@toquis.com</a> .
        </p>
        }
        banner
        closable
      />
    </Space>
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