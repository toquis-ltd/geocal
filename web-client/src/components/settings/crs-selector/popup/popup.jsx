import { useSelector } from 'react-redux';

import Popup from 'components/common/popup/popup';
import Interface from 'components/common/popup/interface/menu-bar/menu';

import SearchView from './views/search/view';
import GlobeView from './views/globe/view';

import './popup.sass';

function CrsPopup({ onClose }) {
    const state = useSelector(state => state.popups.isChangingCRS);

    return (
        <Popup isOpen={state} name='crs'>
            <Interface onClose={onClose}/>
            <div className="view--crs">
                <div className="view__inner--crs">
                    <SearchView />
                    <GlobeView />
                </div>
            </div>
        </Popup>
    )
}

export default CrsPopup;