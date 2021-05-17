export function Classic(onClose, onSubmit, submitText) {
    return (
            <div className='popup__interface'>
                <button className='popup__close-btn' onClick={() => onClose()} type='button'>&#215;</button>
                <button className='apply__button popup__save-btn' onClick={() => onSubmit()} type='submit'>{submitText}</button>
            </div>
    );
}

export function OnlyCloseButton(onClose) {
    return (
            <div className='popup__interface'>
                <button className='popup__close-btn' onClick={() => onClose()} type='button'>&#215;</button>
            </div>
    );
}