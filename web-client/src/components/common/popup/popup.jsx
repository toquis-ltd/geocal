import ReactDOM from 'react-dom';
import './popup.css';

function Popup ({isOpen, name, children}) {
  if (!isOpen) return null;
  return ReactDOM.createPortal (
    <div className={`popup popup--${name}`}>
      <div className={`popup__inner popup__inner--${name}`} >
        {children}
      </div>
    </div>,
    document.getElementById('popups')
    );
}

export default Popup;