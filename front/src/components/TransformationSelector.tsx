import React from 'react';

import { Modal, Button, Card, List, Divider } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { SettingsContext } from '../context/settings';


interface ViewProps {
  index:number
  isOpen:boolean,
  data:TransformationDefinition[]
  toggleView:React.Dispatch<boolean>
}

interface SelectorProps {
  availableTransformations:TransformationDefinition[]
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
                <div className="item">
                  <p><b>Name: </b>{item.name}</p>
                  <p><b>EPSG: </b>{item.code}</p>
                  <p><b>Area: </b>{item.area[0]}N - {item.area[2]}N {item.area[1]}E - {item.area[3]}E</p>
                </div>
                <Button
                      size='large'
                      type="primary"
                      onClick={()=>onApply(index)}
                      >Select
                </Button>
              </div>
            </List.Item>
          )} />
          <Divider />
      </Modal>
  )
}
const display = (item:TransformationDefinition) => {
  return (
  <>
  <p><b>Name: </b>{item.name}</p>
  <p><b>EPSG: </b>{item.code}</p>
  <p><b>Area: </b>{item.area[0]}N - {item.area[2]}N {item.area[1]}E - {item.area[3]}E</p>
  </>
  )
}

const TransformationSelector : React.FC<SelectorProps> = ({availableTransformations, index}) => {
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
      description={
                    (availableTransformations != undefined && availableTransformations?.length > 0) ? 
                    display(availableTransformations[settings.pipeIds[index]]):"No transformation found"
                  }
    />
    </Card>
    <View toggleView={toggleView} isOpen={isViewed} data={availableTransformations} index={index} />
    </>
  )
}
export default TransformationSelector