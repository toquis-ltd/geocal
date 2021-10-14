import { useRef, useState } from 'react';
import useCRSelector from 'hooks/useCRSelector';
import useCRS from 'hooks/useCRS';

import useOutsideClick from 'hooks/useOutsideClick';

import './button.sass';


function DirectSelectBtn ({parameters, updateOrigin}) {
    const [self,,]  = useCRSelector(parameters.origin)
    const [EPSG, changeEPSG] = useState('');
    const ref = useRef()
    const [isChanging, toggleChange] = useOutsideClick(ref);
    const value = isChanging ? EPSG : self.name || 'Click and enter CRS code';
    const setCRS  = useCRS()
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
        <div className="selector__direct" key={parameters.origin}>
            <input  className='selector__btn' ref={ref} value={value} 
                    onKeyPress={validateChanges}
                    onClick={onClick} onChange={evt => changeEPSG(evt.target.value)} type='tel'/>
        </div>
    );
}

export default DirectSelectBtn;