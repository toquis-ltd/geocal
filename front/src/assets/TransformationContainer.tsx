import {isMobile} from "react-device-detect";
import { Tabs, Col } from "antd";

import P2PTransformation from '../components/P2PTransformation'
import FileUploader from '../components/UploadFile'


const items = [
{
    key:'0',
    label:'Single point transformation',
    children: <P2PTransformation /> 
},
{
    key:'1',
    label:'File transformation',
    children:<FileUploader /> 
},
]

const TransformationContainer:React.FC = () => {
    return  (
        <Col xl={12} xs={24} style={(!isMobile) ? {height:'270px'}:{height:'300px'}}>
            <Tabs items={items} />
        </Col>
    )
    
}
export default TransformationContainer;