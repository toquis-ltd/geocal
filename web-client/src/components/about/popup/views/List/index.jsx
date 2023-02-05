import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Item from '../../item';
import Result from 'components/common/list/result';

import { fetchTransformationList } from '../../../api';

import './view.sass';

export default function TransformationView({onClose, onImport}) {
    const [source, target, transform] = useSelector(({settings}) => [settings.source, settings.target, settings.transform?.name]);
    const [list, setList] =  useState([]);
    useEffect(() => {
        fetchTransformationList(source.code, target.code).then(i => setList(i))
    }, [source, target]);

    return (
        <div className="transform">
            <div className="transform__inner">
                <Result className='transform'>
                    {list?.reverse().map((transformation) => {
                        
                        return <Item 
                            transformation={transformation}
                            onSelect={onClose}
                            isSelected={transform === transformation.name}
                         /> 
                    
                    }) || <p>No Transformation</p>}
                    
                </Result>
                <div className="transform__menu">
                    <button className='transformation__btn transform__import' onClick={onImport}>Import transformation</button>
                </div>
            </div>
        </div>
    );
};