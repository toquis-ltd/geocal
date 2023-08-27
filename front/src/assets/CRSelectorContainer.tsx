import { Col, Button} from 'antd';
import {SwapOutlined} from '@ant-design/icons';

import CRSItem from '../components/CRSItem';
import {NumberOfTranfromationsEnum} from '../enums/settings';
import React from 'react';

import { SettingsContext } from '../context/settings';


interface SwapProps{
    size:number
    onClick: VoidFunction
};

const SwapButton:React.FC<SwapProps> = ({onClick, size}) => {
    return <Col span={size} style={{display:'flex', justifyContent:'center', margin:'auto'}}>
                <Button onClick={onClick} children={<><SwapOutlined /> Swap <SwapOutlined /></>} />
            </ Col>
}

const swapPipeline =  (isSwapedFirst:boolean, pipeline:CRSModelType[]) => {
    if (isSwapedFirst) {
        [pipeline[0], pipeline[1]] = [pipeline[1], pipeline[0]];
        return pipeline
    }

    [pipeline[1], pipeline[2]] = [pipeline[2], pipeline[1]];
    return pipeline
}

const sizes = [
    [10, 2],
    [7, 1]
]

const CRSelectorContainer:React.FC = () => {
    const settings = React.useContext<SettingStateType>(SettingsContext);
    const isSmall = settings.transformationsNumber===NumberOfTranfromationsEnum.Two
    const onSwap = (isSwapedFirst:boolean) => {
        const pipeline = swapPipeline(isSwapedFirst, settings.transformationsItems)
        settings.setState({...settings, transformationsItems:pipeline} as SettingStateType)
    };
    return (
    <>
        <Col span={sizes[Number(isSmall)][0]}>
            <CRSItem index={0} />
        </Col>
        <SwapButton size={sizes[Number(isSmall)][1]} onClick={() => onSwap(true)}/>
        <Col span={sizes[Number(isSmall)][0]}>
            <CRSItem index={1} />
        </Col>
        {(isSmall) ?  
        <>
            <SwapButton size={sizes[Number(isSmall)][1]} onClick={() => onSwap(false)}/>
            <Col span={sizes[1][0]}>
                <CRSItem index={2} />
            </Col>
        </> : null
        }
    </>
    )
}

export default CRSelectorContainer;