import { useState, useEffect, useRef } from 'react';

import './item.sass'


export default function CrsItem({element, i, onClick=()=>null}){
    const [isActive, toggleActive] = useState(false);
    const wraper =  useRef(null);
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (isActive && wraper.current && !wraper.current.contains(event.target) ) {
                toggleActive(false);
            }
        }
        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [wraper, isActive]);

    return (
        <div className={`result__item ${isActive && 'result__item--activate'}`} key={i} ref={wraper}>
            <div className="result__item-about" onClick={() => toggleActive(!isActive)} >
                <h3 className='result__item-title'>{element.name}</h3>
                <h4 className='result__item-description result__item-description--area'>Area: {element.area}</h4>
                <h4 className='result__item-description result__item-description--unity'>Unity: {element.unityOfMeasure}</h4>
                <h4 className='result__item-description result__item-description--code'>EPSG Code: {element.code}</h4>
            </div>
            { isActive &&
                <div className="result__item-control">
                    <button className='result__item-select' onClick={()=>onClick(element.code)}>select</button>
                    <button className='result__item-view'>view on globe</button>
                    <button className='result__item-more'>more information about</button>
            </div>
            }
        </div>
    );
}