import { useSelector } from 'react-redux';

import {fetchTransformationPropreties} from './api';

import { RootState } from "reducers"
import { useEffect, useState } from 'react';

export default function CrsIntersection() {
    const [source, target] = useSelector(({settings}:RootState)=> [settings.source, settings.target]);
    const [transformationSteps, handleSteps] =  useState('');
    
    useEffect (()=>{
        fetchTransformationPropreties(source.code, target.code).then(
            (res:string) => handleSteps(res)
        )
    }, [source, target]);
    
    return (
            <div className={`about__colomn about__colomn-intersection`}>
                <h3 className='about__colomn-title'>Transformation: </h3>
                <h4 className=''>{transformationSteps}</h4>
            </div>
    )
}