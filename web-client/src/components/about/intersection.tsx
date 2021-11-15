import { useSelector } from 'react-redux';

import {fetchTransformationPropreties} from './api';

import { RootState } from "reducers"
import { useEffect, useState } from 'react';

export default function CrsIntersection() {
    const [source, target] = useSelector(({settings}:RootState)=> [settings.source, settings.target]);
    const [transformationSteps, handleSteps] =  useState<any[]>([]);
    
    useEffect (()=>{
        fetchTransformationPropreties(source.code, target.code).then(
            (res:any[]) => handleSteps(res)
        )
    }, [source, target]);
    return (
            <div className={`about__colomn about__colomn-intersection`}>
                <h4 className='about__colomn-title'>Transformation pipeline:</h4>
                <ol className="transformations">
                    {
                    transformationSteps?.map(step => 
                        <li className="transformation__step" key={step.name+step.propreties}>
                            <h5 className="transformation__step-name">{step.name}</h5>
                            <ul className="transformation__propreties">
                                {
                                    step.propreties?.map((proprety:any) => 
                                    <li className="transformation__property" key={proprety}>
                                        {proprety}
                                    </li>
                                )}
                            </ul>
                        </li>
                    )
                    
                    }
                </ol>
            </div>
    )
}