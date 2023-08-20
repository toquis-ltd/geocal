import React from 'react'

import { Collapse } from 'antd';


const content = { 
  key: '1',
  label: 'Verify transformation',
  children: <p>Hello</p>
}

const P2PTransformation : React.FC = () => {
  return <Collapse size="large" items={[content]} />
}

export default P2PTransformation