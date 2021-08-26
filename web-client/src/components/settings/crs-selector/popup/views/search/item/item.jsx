import { useRef, memo } from 'react';

import useCRS  from 'hooks/useCRS';

import useOutsideClick from 'hooks/useOutsideClick';

import './item.sass'

export default memo(function CrsItem({element}) {
    const wraper =  useRef(null);
    const [isActive, toggleActive] = useOutsideClick(wraper);
    const handleClick = () => toggleActive(!isActive);
    const setCRS = useCRS();
    const handleSelect = () => setCRS(element);

    return (
        <div className={`result__item ${ (isActive) ? 'result__item--activate':''}`} key={Math.round(Math.random()*10**5)} ref={wraper}>
            <div className="result__item-about" onClick={handleClick} >
                <h3 className='result__item-title'>{element.name}</h3>
                <h4 className='result__item-description result__item-description--area'>Area: {element.area}</h4>
                <h4 className='result__item-description result__item-description--unity'>Unity: {element.unityOfMeasure}</h4>
                <h4 className='result__item-description result__item-description--code'>EPSG Code: {element.code}</h4>
            </div>
            { isActive &&
                <div className="result__item-control">
                    <button className='base__button result__btn result__item-select' onClick={handleSelect}>Select</button>
                    <button className='base__button result__btn result__item-fork'>Fork</button>
                </div>
            }
        </div>
    );
});