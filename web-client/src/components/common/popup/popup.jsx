import ReactDOM from 'react-dom';
import './popup.css';

function Popup ({isOpen, children}) {
  if (!isOpen) return null;
  return ReactDOM.createPortal (
    <div className='popup'>
      <div className={`popup__inner`} >
        {children}
      </div>
    </div>,
    document.getElementById('popup')
    );
}

export default Popup;