import { useState, useEffect } from 'react';

import BackIcon from '../../../../../icons/back-icon';
import CloseIcon from '../../../../../icons/close-icon';

import '../common.sass';
import './menu.sass';

function Interface({onClose}) {
    
        const size = 1024; // this is the limit of screen size for a desktop
        const [isMobile, toggleMobile] =  useState(window.innerWidth <= size);
        const handleScreen = () => toggleMobile(window.innerWidth <= size);

        useEffect(() => {        
                window.addEventListener('resize', handleScreen);
                return () => window.removeEventListener('resize', handleScreen);
        }, []);

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