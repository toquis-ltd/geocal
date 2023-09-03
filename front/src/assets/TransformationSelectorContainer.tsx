import React from 'react';

import {Col} from 'antd';


import { SettingsContext } from '../context/settings';
import TransformationSelector from '../components/TransformationSelector';

import {NumberOfTranfromationsEnum} from '../enums/settings';

import {TransformationsList} from '../api'

const sizes = [
    [12, 6],
    [10, 2]
]

const TransformationSelectorContainer:React.FC = () => {
    const settings = React.useContext(SettingsContext);
    const isSecondInluded = settings.transformationsNumber == NumberOfTranfromationsEnum.Two
    const [state, setState] = React.useState<[string[], string[]]>([[], []])

    React.useEffect(()=>{
        if ((settings.transformationsItems.length)<=1) {
            setState([[], []]);
            return
        };
        settings.setState({...settings, pipeIds:[0, 0]})
        TransformationsList(settings)
        .then(res=>{
            if (res == undefined) {
                setState([[], []]);
            } else {
                setState(res);
            }
        }).catch(()=>setState([[], []]));
      }, 
      [     settings.transformationsItems[0], 
            settings.transformationsItems[1],
            settings.transformationsItems[2]])
      
    return (
    <>
        <Col span={sizes[Number(isSecondInluded)][1]} />
        <Col span={sizes[Number(isSecondInluded)][0]}>
            <TransformationSelector index={0}  availableTransformations={state[0]} />
        </Col>
        {(isSecondInluded) ?
        <>
            <Col span={sizes[1][0]}>
                <TransformationSelector index={1} availableTransformations={state[1]} />
            </Col>
        </> : null
        }
        <Col span={sizes[Number(isSecondInluded)][1]} />
    </>
    )
}

export default TransformationSelectorContainer;