import React from 'react';

import {Col} from 'antd';


import { SettingsContext } from '../context/settings';
import TransformationSelector from '../components/TransformationSelector';

import {NumberOfTranfromationsEnum} from '../enums/settings';

import {TransformationsList} from '../api'

const sizes = [
    [12, 6],
    [10, 2],
    [12, 0]
]

const TransformationSelectorContainer:React.FC = () => {
    const settings = React.useContext(SettingsContext);
    // const isSecondInluded = ;
    const [state, setState] = React.useState<TransformationDefinition[][]>([[], [], []])

    React.useEffect(()=>{
        if ((settings.transformationsItems.length)<=1) {
            setState([[], [], []]);
            return
        };
        settings.setState({...settings, pipeIds:[0, 0, 0]})
        TransformationsList(settings)
        .then(res=>{
            if (res == undefined) {
                setState([[], [], []]);
            } else {
                setState(res);
            }
        }).catch(()=>setState([[], [], []]));
      }, 
      [     settings.transformationsItems[0], 
            settings.transformationsItems[1],
            settings.transformationsItems[2],
            settings.transformationsItems[3],
            settings.transformationsNumber])
      
    return (
    <>
        <Col xl={sizes[Number(settings.transformationsNumber)][1]} />
        <Col xl={sizes[Number(settings.transformationsNumber)][0]} xs={24}>
            <TransformationSelector index={0}  availableTransformations={state[0]} />
        </Col>
        {(settings.transformationsNumber >= NumberOfTranfromationsEnum.Two) ?
        <>
            <Col xl={sizes[Number(settings.transformationsNumber)][0]} xs={24}>
                <TransformationSelector index={1} availableTransformations={state[1]} />
            </Col>
        </> : null
        }
        {(settings.transformationsNumber >= NumberOfTranfromationsEnum.Three) ?
        <>
            <Col xl={sizes[Number(settings.transformationsNumber)][0]} xs={24}>
                <TransformationSelector index={2} availableTransformations={state[2]} />
            </Col>
        </> : null
        }
    </>
    )
}

export default TransformationSelectorContainer;