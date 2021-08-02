import { useState } from 'react';

import CrsPopup from './popup/popup';
import SelectBtn from './button/button';

import './crs-selector.css';

function CrsSelector ({parameters}) {
    const [isChanging, toggleChange] = useState(false);
    return (
        <div className='selector'>
            <div className='selector__header'>
                <h3 className="field-title selector__title">{parameters.title}</h3>
            </div>
            <div className='selector__container'>
                <SelectBtn onClick={()=>toggleChange(true)}/>
            </div>
            <div className='selector__footer'>
            </div>
            <CrsPopup
                isOpen={isChanging}
                onClose={()=>toggleChange(false)} 
                parameters={parameters}
                />
        </div>
    );
}

export default CrsSelector;