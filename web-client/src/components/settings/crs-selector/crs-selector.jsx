import { useDispatch } from 'react-redux';

import { togglePopup } from '../../../actions/popups';
import { setOrigin } from '../../../actions/settings';

import AdvancedSelectBtn from './button/advanced';
import DirectSelectBtn from './button/direct';

import useCRSCode from 'hooks/useCRSCode';

import CrsPopup from './popup/popup';

import './crs-selector.sass';

export default function CrsSelector ({parameters}) {
    const dispatch = useDispatch();

    const closePopup = () => dispatch(togglePopup(false));
    const openPopup = () => {
        dispatch(togglePopup(true));
        dispatch(setOrigin(parameters.origin))
    }
    const crsCode = useCRSCode(parameters.origin);

    return (
        <div className='selector'>
            <div className='selector__header'>
                <h3 className="field-title selector__title">{parameters.title}</h3>
            </div>
            <div className='selector__container'>
                <DirectSelectBtn parameters={parameters} updateOrigin={()=>dispatch(setOrigin(parameters.origin))}/>
            </div>
            <div className='selector__footer'>
                <AdvancedSelectBtn onClick={openPopup} parameters={parameters}/>
                EPSG: {crsCode}
            </div>
            <CrsPopup onClose={closePopup}/>
        </div>
    );
};