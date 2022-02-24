import { RootState } from "reducers"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {fetchTransformationList} from '../api';

import {setTransform} from 'actions/settings';

import { toggleTransformPopup } from 'actions/popups';
import TransformationPopup from '../popup'

export default function CrsIntersection() {
    const dispatch =  useDispatch();
    const [source, target, transform] = useSelector(({settings}:RootState)=> [settings.source, settings.target, settings.transform]);
    
    const closePopup = () => dispatch(toggleTransformPopup(false));
    const openPopup = () => dispatch(toggleTransformPopup(true));
    
    
    useEffect ( () => {
        fetchTransformationList(source.code, target.code)
        .then(res => {            
            if (Array.isArray(res)) {
                if (res.length >= 1) 
                    dispatch(setTransform(res[0]));
                if (res.length === 0) 
                    dispatch(setTransform(undefined));
            }
        });
        
    }, [source, target]);
    
    return (
        <>
            <div className={`about__colomn about__colomn-intersection`} onClick={openPopup}>
                <h3 className='about__colomn-title'>Transformation: </h3>
                <h5 className=''>{ (transform !== undefined) ? transform.name : "No Transformation"}</h5>
            </div>
            <TransformationPopup onClose={closePopup}/>
        </>

    )
}