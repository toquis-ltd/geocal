import '../common.css';
import './menu.css';

function Interface({onClose, children}) {
    return (
            <div className="popup__menu-bar">
                <button className='popup__close-btn' onClick={onClose}>&#215;</button>
            </div>
    );
}

export default Interface;