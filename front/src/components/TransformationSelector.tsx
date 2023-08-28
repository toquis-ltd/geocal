import React from 'react';

import { Modal, Button, Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { SettingsContext } from '../context/settings';


interface ViewProps {
  isOpen:boolean,
  setViewState:React.Dispatch<boolean>
}

interface SelectorProps {
  state:string[]
}

const { Meta } = Card;


const View : React.FC<ViewProps> = (props) => {
  const onApply = () => {
    props.setViewState(false)
  }

  return (
    <Modal
        title="Select coordinate referance area"
        centered
        open={props.isOpen}
        onCancel={() => props.setViewState(false)}
        footer={[<Button key="ok" type="primary" onClick={onApply} children={'Apply'} />]}
        width={1000}>
      
    </Modal> 
  )
}

const TransformationSelector : React.FC<SelectorProps> = ({state}) => {
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
      description={(state != undefined | state?.length > 0) ? state[0]:"No transformation found"}
    />
    </Card>
    <View setViewState={toggleView} isOpen={isViewed}  />
    </>
  )
}
export default TransformationSelector