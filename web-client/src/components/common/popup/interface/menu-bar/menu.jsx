import { useState } from 'react';

import BackIcon from '../../../../../icons/back-icon';

import '../common.sass';
import './menu.sass';

function Interface({onClose}) {
    const size = 1024;
    const [isMobile, toggleMobile] =  useState(window.screen.width <= size);
    window.addEventListener('resize', () => toggleMobile(window.screen.width <= size));
    return (
            <div className="popup__menu-bar">
                <button 
                className='popup__close-btn'
                onClick={onClose}>
                                { (isMobile) ? <><BackIcon/> <span>Back</span></> : <>&#215;</> }
                </button>
            </div>
    );
}

export default Interface;