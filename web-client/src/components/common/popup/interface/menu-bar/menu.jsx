import { useState } from 'react';

import '../common.css';
import './menu.css';

function Interface({onClose, children}) {
    const [isMobile, toggleMobile] =  useState(window.screen.width <= 1024);
    window.addEventListener('resize', ()=>{
        toggleMobile(window.screen.width <= 800);
        console.log(window.screen.width)
    });
    return (
            <div className="popup__menu-bar">
                { (isMobile) ?
                    <button className='popup__mobile-close-btn' onClick={onClose}> {'<='} </button> :
                    <button className='popup__close-btn' onClick={onClose}>&#215;</button>
                }
            </div>
    );
}

export default Interface;