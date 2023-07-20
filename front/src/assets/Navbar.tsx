import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import type { MenuProps, MenuTheme } from 'antd';

const { Header } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  onClick: (key:string) => void,
): MenuItem {
  return {
    key,
    label,
    onClick,
  } as MenuItem;
}

const Navbar : React.FC = () => {
  const navigate = useNavigate();
  const goto = (key:string) => navigate(`/${key}`);

  const items: MenuItem[] = [
    getItem('Settings', 'settings', (event)=>goto(event.key)),
    getItem('Verify Transformation', 'verify', (event)=>goto(event.key)),
    getItem('Transform file', 'transform', (event)=>goto(event.key)),
    getItem('Preview', '', (event)=>goto(event.key)),
  ]

  return (
    <Header style={{backgroundColor: "#f5f5f5"}}>
      <Menu 
            mode="horizontal"
            style={{borderRadius: '20px', display: 'flex', justifyContent:'center'}}
            items={items} 
       />
    </Header>
  )
}

export default Navbar