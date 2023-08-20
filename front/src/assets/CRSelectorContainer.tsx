import { Col } from 'antd';

import CRSItem from '../components/CRSItem';
import {NumberOfTranfromationsEnum} from '../enums/settings';

interface CRSItemProps{
    transformationsNum:NumberOfTranfromationsEnum
};

const CRSelectorContainer:React.FC = (props:CRSItemProps) => {
    return (
    <>
        { (props.transformationsNum===NumberOfTranfromationsEnum.One) ? 
            <>
            <Col span={3} />
            <Col span={7}>
                <CRSItem id={0} />
            </Col>
            <Col span={4}/>
            <Col span={7}>
                <CRSItem id={1} />
            </Col>
            <Col span={3}/>
            </> 
            :
            <>
            <Col span={1} />
            <Col span={6}>
                <CRSItem id={0} />
            </Col>
            <Col span={2} />
            <Col span={6} >
                <CRSItem id={1} />
            </Col>
            <Col span={2} />
            <Col span={6}>
                <CRSItem id={2} />
            </Col>
            <Col span={1}/>
            </> 
        }
    </>
    )
}

export default CRSelectorContainer;