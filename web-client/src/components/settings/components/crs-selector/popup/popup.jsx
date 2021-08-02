import {useState} from 'react';

import Popup from '../../../../common/popup/popup';
import Interface from '../../../../common/popup/interface/menu-bar/menu';


import SearchView from './views/search/view';
import GlobeView from './views/globe/view';

import './popup.sass';

function CrsPopup({isOpen, onClose, parameters}) {
    const [search, setSearch] = useState({qwery:'', result:[]});

    return (
        <Popup isOpen={isOpen}>
            <Interface onClose={onClose}/>
            <div className="view">
                <div className="view__inner">
                    <SearchView name='Search' state={search} setState={setSearch}/>
                    <GlobeView />
                </div>
            </div>
        </Popup>
    )
}

export default CrsPopup;