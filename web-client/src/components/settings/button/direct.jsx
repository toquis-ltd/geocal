import { useRef, useState } from 'react';

import useCRSelector from 'hooks/useCRSelector';
import useOutsideClick from 'hooks/useOutsideClick';
import useCRS from 'hooks/useCRS';

import './button.sass';
import { useSelector } from 'react-redux';

function DirectSelectBtn ({origin, updateOrigin}) {

    const ref = useRef(); 
    const name = useSelector(({settings}) => settings[origin]?.name);
    
    const [EPSG, changeEPSG] = useState('');
    const [isChanging, toggleChange] = useOutsideClick(ref);
    const value = isChanging ? EPSG : name || 'Click and enter CRS code';
    const setCRS  = useCRS();

    const validateChanges = evt => {
        if (evt.key === "Enter") {
            const item = {code:EPSG}
            setCRS(item)
        }
    };
    
    const onClick = () => {
        updateOrigin()
        changeEPSG('')
        toggleChange(true)
    }

    return (
        <div className="selector__direct" key={origin}>
            <input  
                    className='selector__btn' 
                    ref={ref} 
                    value={value} 
                    onKeyPress={validateChanges}
                    onClick={onClick} 
                    onChange={evt => changeEPSG(evt.target.value)} 
                    type='tel'/>
        </div>
    );
}

export default DirectSelectBtn;