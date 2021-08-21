import { useSelector } from 'react-redux';

import './button.sass';


function SelectBtn ({onClick, parameters}) {
    const self = useSelector(state => state.settings[parameters.origin]);
    const oppositName = parameters.origin==='source' ? 'target':'source';
    const other = useSelector(state => state.settings[oppositName]);
    
    return (
        <button className='selector__btn' onClick={onClick}>
            { (self?.name && self.name == other?.name) ? self.name + ' EPSG code:' + self.code : self.name || 'Click to select CRS' }
        </button>
    );
}

export default SelectBtn;