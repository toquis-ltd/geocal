import ReactDOM from 'react-dom';

function Popup (props) {
  if (!props.isOpen) return null;
  return ReactDOM.createPortal (
    <div className='popup'>
      <div className={`popup__inner ${props.className}`}>
        <div className='popup__container'>
          {props.children}
        </div>
        {props.interface()}
      </div>
    </div>,
    document.getElementById('popup')
    );
}

export default Popup;