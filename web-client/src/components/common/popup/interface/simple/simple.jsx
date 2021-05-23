import './simple.css';

function Interface({onClose}) {
    return (
            <div className='popup__interface'>
                <button className='popup__close-btn' onClick={() => onClose()} type='button'>&#215;</button>
            </div>
    );
}

export default Interface;