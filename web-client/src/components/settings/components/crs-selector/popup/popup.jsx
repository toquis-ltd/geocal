import Popup from '../../../../common/popup/popup';
import Interface from '../../../../common/popup/interface/simple/simple';
import Navigation from '../../../../common/popup/navigation/navigation';

import SearchView from './views/search/search';

import './popup.css';

function CrsPopup({isOpen, onClose, parameters}) {
    return (
        <Popup isOpen={isOpen}>
            <Interface onClose={onClose}/>
            <Navigation>
                <SearchView name='Search'/>
                <SearchView name='Popular'/>
            </Navigation>
        </Popup>
    )
}

export default CrsPopup;