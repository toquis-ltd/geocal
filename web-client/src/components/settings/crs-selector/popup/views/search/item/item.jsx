import { useRef, memo, useMemo } from 'react';
import useCRSelector from 'hooks/useCRSelector'
import useOutsideClick from 'hooks/useOutsideClick';

import useCRS  from 'hooks/useCRS';

import './item.sass'


export default memo(function CrsItem({element}) {
    const wraper =  useRef(null);
    const item = useRef(null);
    
    const [self, other, origin] = useCRSelector();
    const hasBeenSelected = useMemo(()=>(self?.code===element.code || other?.code === element.code), [self, other])
    const [isSelected, onSelect] = useOutsideClick(item, hasBeenSelected);
    const setCRS = useCRS();
    const handleSelect = () => {
        onSelect(true)
        setCRS(element);
    }
    return (
        <div className={`result__item ${(isSelected) ? 'result__item--selected':null }`} 
             key={Math.round(Math.random()*10**5)} ref={wraper} onClick={handleSelect} ref={item}>
                <div className="result__item-about" >
                    <h3 className='result__item-title'>{element.name} {(isSelected) ? <span style={{"color":"red"}}>Selected</span>:null } </h3>
                    <h4 className='result__item-description result__item-description--area'>Area: {element.area}</h4>
                    <h4 className='result__item-description result__item-description--unity'>Unity: {element.unityOfMeasure}</h4>
                    <h4 className='result__item-description result__item-description--code'>EPSG Code: {element.code}</h4>
                </div>
        </div > 
    );
});