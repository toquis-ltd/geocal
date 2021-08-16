import Popup from '../../../../common/popup/popup';
import Interface from '../../../../common/popup/interface/menu-bar/menu';


import SearchView from './views/search/view';
import GlobeView from './views/globe/view';

import './popup.sass';

function CrsPopup({isOpen, onClose}) {
    return (
        <Popup isOpen={isOpen}>
            <Interface onClose={onClose}/>
            <div className="view">
                <div className="view__inner">
                    <SearchView />
                    <GlobeView />
                </div>
            </div>
        </Popup>
    )
}

export default CrsPopup;