import { useRef, memo, useEffect, useState } from 'react';
import useCRSelector from 'hooks/useCRSelector';
import { togglePopup } from 'actions/popups';

import useCRS  from 'hooks/useCRS';

import './item.sass'
import { useDispatch } from 'react-redux';


export default memo(function CrsItem({element}) {
    const wraper =  useRef(null);
    const item = useRef(null);
    

    const dispatch = useDispatch();
    const closeWindow = () => dispatch(togglePopup(false));
    const [self, other, origin] = useCRSelector();
    const [isAlreadySelected, toggleAlreadySelected] = useState(false)
    useEffect(()=>toggleAlreadySelected(self?.code===element.code || other?.code === element.code), [self, other])
    const setCRS = useCRS();
    const handleSelect = () => {
        setCRS(element);
        closeWindow();
    }
    return (
        <div className={`result__item ${(isAlreadySelected) ? 'result__item--selected':null }`} 
             key={element.code} ref={wraper} onClick={handleSelect} ref={item}>
                <div className="result__item-about" >
                    <h3 className='result__item-title'>{element.name} {(isAlreadySelected) ? <span style={{"color":"red"}}>Selected</span>:null } </h3>
                    <h4 className='result__item-description result__item-description--area'>Area: {element.area}</h4>
                    <h4 className='result__item-description result__item-description--unity'>Unity: {element.unityOfMeasure}</h4>
                    <h4 className='result__item-description result__item-description--code'>EPSG Code: {element.code}</h4>
                </div>
        </div > 
    );
});