import React from 'react';

import { Modal, Button, Card, List, Divider } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { SettingsContext } from '../context/settings';


interface ViewProps {
  index:number
  isOpen:boolean,
  data:string[]
  toggleView:React.Dispatch<boolean>
}

interface SelectorProps {
  state:string[]
  index:number
}

const { Meta } = Card;


const View : React.FC<ViewProps> = (props) => {
  const settings = React.useContext<SettingStateType>(SettingsContext);

  const onApply = (value:number) => {
    const pipe = settings.pipeIds;
    pipe[props.index] = value
    settings.setState({...settings, pipeIds:pipe})
    props.toggleView(false)
  }

  return (
    <Modal
        title="Select coordinate referance area"
        centered
        open={props.isOpen}
        onCancel={() => props.toggleView(false)}
        footer={[]}
        width={1000}
        >
        
       <List
          style={{maxHeight:'50vh', overflow:'auto', overflowX:'hidden' }}
          dataSource={props.data}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <div className="item" style={{width:'100%', display:'flex', justifyContent:"space-between"}}>
                <p>{item}</p>
                <Button
                      size='large'
                      type="primary"
                      onClick={()=>onApply(index)}
                      >Select</Button>
              </div>
            </List.Item>
          )} />
          <Divider />
      </Modal>
  )
}

const TransformationSelector : React.FC<SelectorProps> = ({state, index}) => {
  const settings = React.useContext<SettingStateType>(SettingsContext);
  const [isViewed, toggleView] = React.useState<boolean>(false);
  return (
    <>
    <Card
      actions={[
        <Button onClick={() => toggleView(true)}>
          <SettingOutlined key="setting"/> Change
        </Button>
      ]}>
    <Meta
      title='Transformation'
      description={(state != undefined && state?.length > 0) ? state[settings.pipeIds[index]]:"No transformation found"}
    />
    </Card>
    <View toggleView={toggleView} isOpen={isViewed} data={state} index={index} />
    </>
  )
}
export default TransformationSelector