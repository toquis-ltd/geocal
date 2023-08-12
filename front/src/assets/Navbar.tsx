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

  return (
    <Header style={{backgroundColor: "#f5f5f5", textAlign: 'center'}}>
      <h1>TOQUIS - MAPLESS</h1>
    </Header>
  )
}

export default Navbar