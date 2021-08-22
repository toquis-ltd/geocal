import { useMobileOnly } from 'hooks/useMobileOnly';

import BackIcon from '../../../../../icons/back-icon';
import CloseIcon from '../../../../../icons/close-icon';

import '../common.sass';
import './menu.sass';

function Interface({onClose}) {
        const isMobile = useMobileOnly();
        return (
                <div className="popup__menu-bar">
                        <button 
                        className='popup__close-btn'
                        onClick={onClose}>
                                { (isMobile) ? <><BackIcon/><span>Back</span></> : <CloseIcon/> }
                        </button>
                </div>
        );
}

export default Interface;