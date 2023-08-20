import { Tabs, Col } from "antd";

import P2PTransformation from '../components/P2PTransformation'
import FileUploader from '../components/UploadFile'


const items = [
{
    key:'1',
    label:'File transformation',
    children:<FileUploader /> 
},
{
    key:'0',
    label:'Verify transformation',
    children: <P2PTransformation /> 
}]

const TransformationContainer:React.FC = () => {
    return  (
        <Col span={24} >
            <Tabs items={items} />
        </Col>
    )
    
}
export default TransformationContainer;