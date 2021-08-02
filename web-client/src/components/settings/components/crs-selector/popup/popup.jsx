import {useState} from 'react';

import Popup from '../../../../common/popup/popup';
import Interface from '../../../../common/popup/interface/menu-bar/menu';


import SearchView from './views/search/view';

import './popup.sass';

function CrsPopup({isOpen, onClose, parameters}) {
    const [search, setSearch] = useState({qwery:'', result:[]});

    return (
        <Popup isOpen={isOpen}>
            <Interface onClose={onClose}/>
            <SearchView name='Search' state={search} setState={setSearch}/>
        </Popup>
    )
}

export default CrsPopup;