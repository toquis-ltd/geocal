import { useRef } from 'react';
import useOutsideClick from '../../../../../../../../hooks/useOutsideClick';

import './item.sass'

export default function CrsItem({element, i, onClick=()=>null}){
    const wraper =  useRef(null);
    const [isActive, toggleActive] = useOutsideClick(wraper, 'mouseup');
    
    return (
        <div className={`result__item ${ (isActive) ? 'result__item--activate':''}`} key={i} ref={wraper}>
            <div className="result__item-about" onClick={() => toggleActive(!isActive)} >
                <h3 className='result__item-title'>{element.name}</h3>
                <h4 className='result__item-description result__item-description--area'>Area: {element.area}</h4>
                <h4 className='result__item-description result__item-description--unity'>Unity: {element.unityOfMeasure}</h4>
                <h4 className='result__item-description result__item-description--code'>EPSG Code: {element.code}</h4>
            </div>
            { isActive &&
                <div className="result__item-control">
                    <button className='result__btn result__item-select' onClick={()=>onClick(element.code)}>select</button>
                    <button className='result__btn result__item-view'>view on globe</button>
                    <button className='result__btn result__item-more'>more information about</button>
            </div>
            }
        </div>
    );
}