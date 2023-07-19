import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const Navbar : React.FC = () => {
  const navigate = useNavigate();
  const goto = (key:string) => navigate(`/${key}`);

  return (
    <Header style={{backgroundColor: "#f5f5f5"}}>
      <Menu mode="horizontal" style={{borderRadius: '20px', display: 'flex', justifyContent:'center'}}>
        <Menu.Item onClick={(event)=>goto(event.key)} key="settings">
            Settings
        </Menu.Item>
        <Menu.Item onClick={(event)=>goto(event.key)} key="verify">
            Verify Transformation
        </Menu.Item>
        <Menu.Item onClick={(event)=>goto(event.key)} key="transform">
            Transform file
        </Menu.Item>
        <Menu.Item onClick={(event)=>goto(event.key)} key="">
            Preview
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default Navbar