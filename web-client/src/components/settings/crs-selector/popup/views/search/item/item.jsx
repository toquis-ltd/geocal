import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import {setCRS} from '../../../../../../../actions/settings'
import useOutsideClick from '../../../../../../../hooks/useOutsideClick';

import { fetchProj4 } from '../api';

import './item.sass'

export default function CrsItem({element}) {
    const dispatch = useDispatch();
    const wraper =  useRef(null);
    const [isActive, toggleActive] = useOutsideClick(wraper, 'mouseup');

    const handleClick = () => toggleActive(!isActive);
    const handleSelect = () => {
        fetchProj4(element.code).then(res=>{
            dispatch(setCRS({
                name: element.name,
                code: element.code,
                uom: element.unityOfMeasure,
                proj4: res
            }));
        });
    };
    return (
        <div className={`result__item ${ (isActive) ? 'result__item--activate':''}`} key={element.code} ref={wraper}>
            <div className="result__item-about" onClick={handleClick} >
                <h3 className='result__item-title'>{element.name}</h3>
                <h4 className='result__item-description result__item-description--area'>Area: {element.area}</h4>
                <h4 className='result__item-description result__item-description--unity'>Unity: {element.unityOfMeasure}</h4>
                <h4 className='result__item-description result__item-description--code'>EPSG Code: {element.code}</h4>
            </div>
            { isActive &&
                <div className="result__item-control">
                    <button className='result__btn result__item-select' onClick={handleSelect}>select</button>
                    {/* <button className='result__btn result__item-view'>view on globe</button>
                    <button className='result__btn result__item-more'>more information about</button> */}
                </div>
            }
        </div>
    );
}