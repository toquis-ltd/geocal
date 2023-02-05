import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { togglePopup } from 'actions/popups';
import { setOrigin } from 'actions/settings';

import useCRSCode from 'hooks/useCRSCode';

import AdvancedSelectBtn from '../button/advanced';
import DirectSelectBtn from '../button/direct';
import settingContext from '../settingContext';

import CrsPopup from './popup/popup';

import './crs-selector.sass';

export default function CrsSelector ({}) {

    const {title, origin} = useContext(settingContext);

    const dispatch = useDispatch();
    const closePopup = () => dispatch(togglePopup(false));
    
    const openPopup = () => {
        dispatch(togglePopup(true));
        dispatch(setOrigin(origin))
    };

    const crsCode = useCRSCode(origin);
    return (
        <div className='selector'>
            <div className='selector__header'>
                <h3 className="field-title selector__title">{title}</h3>
            </div>
            <div className='selector__container'>
                <DirectSelectBtn origin={origin} updateOrigin={()=>dispatch(setOrigin(origin))}/>
            </div>
            <div className='selector__footer'>
                <AdvancedSelectBtn onClick={openPopup}/>
                EPSG: {crsCode}
            </div>
            <CrsPopup onClose={closePopup}/>
        </div>
    );
};