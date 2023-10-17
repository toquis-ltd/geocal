import React from 'react';
import { Col, Button} from 'antd';
import {SwapOutlined} from '@ant-design/icons';


import CRSItem from '../components/CRSItem';
import {NumberOfTranfromationsEnum} from '../enums/settings';
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

const SwapCRS =  (swaped_ids:Number[], pipeline:CRSModelType[]) => {
    if (pipeline[swaped_ids[0]] == undefined || 
        pipeline[swaped_ids[1]] == undefined) return pipeline;

    [pipeline[swaped_ids[0]], pipeline[swaped_ids[1]]] = [pipeline[swaped_ids[1]], pipeline[swaped_ids[0]]];
    return pipeline
}

const sizes = [
    [10, 2],
    [7, 1],
    [10, 2]
]

const CRSelectorContainer:React.FC = () => {
    const settings = React.useContext<SettingStateType>(SettingsContext);
    const onSwap = (swaped_ids) => {
        const pipeline = SwapCRS(swaped_ids, settings.transformationsItems)
        settings.setState({...settings, transformationsItems:pipeline} as SettingStateType)
    };
    return (
    <>
        <Col xl={sizes[Number(settings.transformationsNumber)][0]} xs={24}>
            <CRSItem index={0} />
        </Col>

        <SwapButton size={sizes[Number(settings.transformationsNumber)][1]} onClick={() => onSwap([0, 1])}/>

        <Col xl={sizes[Number(settings.transformationsNumber)][0]} xs={24}>
            <CRSItem index={1} />
        </Col>

        {(settings.transformationsNumber >= NumberOfTranfromationsEnum.Two) ?  
        <>
            <SwapButton size={sizes[Number(settings.transformationsNumber)][1]} onClick={() => onSwap([1, 2])}/>
            <Col  xl={sizes[Number(settings.transformationsNumber)][0]} xs={24}>
                <CRSItem index={2} />
            </Col>
        </> : null
        }
        {(settings.transformationsNumber >= NumberOfTranfromationsEnum.Three) ?  
        <>
            <SwapButton size={sizes[Number(settings.transformationsNumber)][1]} onClick={() => onSwap([2, 3])}/>
            <Col  xl={sizes[Number(settings.transformationsNumber)][0]} xs={24}>
                <CRSItem index={3} />
            </Col>
            <SwapButton size={sizes[Number(settings.transformationsNumber)][1]} onClick={() => onSwap([0, 3])}/>

        </> : null
        }
    </>
    )
}

export default CRSelectorContainer;