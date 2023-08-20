import { Col } from 'antd';

import CRSItem from '../components/CRSItem';
import {NumberOfTranfromationsEnum} from '../enums/settings';

interface Props{
    transformationsNumber:NumberOfTranfromationsEnum
};

const CRSelectorContainer:React.FC<Props> = ({transformationsNumber}) => {
    return (
    <>
        { (transformationsNumber===NumberOfTranfromationsEnum.One) ? 
            <>
            <Col span={3} />
            <Col span={7}>
                <CRSItem index={0} />
            </Col>
            <Col span={4}/>
            <Col span={7}>
                <CRSItem index={1} />
            </Col>
            <Col span={3}/>
            </> 
            :
            <>
            <Col span={1} />
            <Col span={6}>
                <CRSItem index={0} />
            </Col>
            <Col span={2} />
            <Col span={6} >
                <CRSItem index={1} />
            </Col>
            <Col span={2} />
            <Col span={6}>
                <CRSItem index={2} />
            </Col>
            <Col span={1}/>
            </> 
        }
    </>
    )
}

export default CRSelectorContainer;