import React from 'react'
import { Layout } from 'antd';

const { Header } = Layout;

const Navbar : React.FC = () => {

  return (
    <Header style={{backgroundColor: "#f5f5f5", textAlign: 'center'}}>
      <h1>TOQUIS - MAPLESS</h1>
    </Header>
  )
}

export default Navbar