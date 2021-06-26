import './simple.css';

function Interface({onClose, children}) {
    return (
            <div className='popup__interface'>
                <button className='popup__close-btn' onClick={() => onClose()} type='button'>&#215;</button>
                {children?.map((item)=>{})}
            </div>
    );
}

export default Interface;