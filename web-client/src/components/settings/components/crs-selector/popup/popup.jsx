import {useState} from 'react';

import Popup from '../../../../common/popup/popup';
import Interface from '../../../../common/popup/interface/simple/simple';
import Navigation from '../../../../common/popup/navigation/navigation';

import SearchView from './views/search/search';
import PopularView from './views/popular/popular';

import './popup.css';

function CrsPopup({isOpen, onClose, parameters}) {
    const [search, setSearch] = useState({qwery:'', result:[]});
    return (
        <Popup isOpen={isOpen}>
            <Interface onClose={onClose}/>
            <Navigation>
                <SearchView name='Search' state={search} setState={setSearch}/>
                <PopularView name='Popular'/>
            </Navigation>
        </Popup>
    )
}

export default CrsPopup;