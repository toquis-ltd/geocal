import React from 'react'

import { Collapse } from 'antd';

const P2PTransformation : React.FC = () => {
  return (
    <Collapse
        size="large"
        items={[{ 
                key: '1',
                label: 'Verify transformation'
                }]}
    >
        <p> Hello</p>
    </Collapse>
  )
}

export default P2PTransformation