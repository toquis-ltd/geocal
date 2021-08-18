import { useDispatch } from 'react-redux';

import { togglePopup } from '../../../actions/popups';
import { setOrigin } from '../../../actions/settings';

import CrsPopup from './popup/popup';
import SelectBtn from './button/button';

import './crs-selector.css';

function CrsSelector ({parameters}) {
    const dispatch = useDispatch();

    const closePopup = () => dispatch(togglePopup(false));
    const openPopup = () => {
        dispatch(togglePopup(true));
        dispatch(setOrigin(parameters.origin))
    }
    return (
        <div className='selector'>
            <div className='selector__header'>
                <h3 className="field-title selector__title">{parameters.title}</h3>
            </div>
            <div className='selector__container'>
                <SelectBtn onClick={openPopup} parameters={parameters}/>
            </div>
            <div className='selector__footer'>
            </div>
            <CrsPopup onClose={closePopup}/>
        </div>
    );
}

export default CrsSelector;