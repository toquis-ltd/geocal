import {useState} from 'react';

import About from './about/about';
import CrsPopup from './popup/popup';
import SelectBtn from './button/button';

import './crs-selector.css';

function CrsSelector ({parameters}) {
    const [isChanging, toggleChanging] = useState(false);

    return (
        <div className='selector'>
            <div className='selector__header'>
                <h3 className="field-title selector__title">{parameters.title}</h3>
            </div>
            <div className='selector__container'>
                <SelectBtn onClick={()=>toggleChanging(true)}/>
            </div>
            <div className='selector__footer'>
                <About code={parameters.code}/>
            </div>
            <CrsPopup 
                isOpen={isChanging}
                onClose={()=>toggleChanging(false)} 
                parameters={parameters}/>
        </div>
    );
}

export default CrsSelector;