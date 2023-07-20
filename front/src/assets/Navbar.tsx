import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import type { MenuProps } from 'antd';

const { Header } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  onClick: (e:MenuItem) => void,
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
    getItem('Settings', 'settings', (event)=>goto(event!.key!.toString())),
    getItem('Verify Transformation', 'verify', (event)=>goto(event!.key!.toString())),
    getItem('Transform file', 'transform', (event)=>goto(event!.key!.toString())),
    getItem('Preview', '', (event)=>goto(event!.key!.toString())),
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