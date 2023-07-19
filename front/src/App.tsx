import { Route, Routes } from "react-router-dom";
import { Layout } from 'antd';

import Navbar from './assets/Navbar'

import VarifyPage from "./pages/verify";
import SettingsPage from "./pages/settings";
import TransformPage from './pages/transform';

import PreviewPage from "./pages/preview";

const { Content, Footer } = Layout;

const App : React.FC = () => {
  return (
  <Layout className="layout">
    <Navbar/>
    <Content style={{ margin: '20px 50px', backgroundColor: '#ffffff', borderRadius: "15px", minHeight: '70vh'}}>
      <Routes>
          <Route path="/" Component={PreviewPage} />
          <Route path="/settings" Component={SettingsPage} />
          <Route path="/verify" Component={VarifyPage} />
          <Route path="/transform" Component={TransformPage} />
      </Routes>
    </Content>
    <Footer style={{ textAlign: 'center' }}>TOQUIS - Mapless</Footer>
  </Layout>
  )
}

export default App;