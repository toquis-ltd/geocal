import './button.css';

import settings from '../../../../../core/converter/settings';


function SelectBtn ({onClick}) {
    return (
        <button className='selector__btn' onClick={onClick}>
            {settings?.source?.title || 'Click to select CRS' }
        </button>
    );
}

export default SelectBtn;