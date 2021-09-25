import { useSelector } from 'react-redux';

import Popup from 'components/common/popup/popup';
import Interface from 'components/common/popup/interface/menu-bar/menu';

import SearchView from './views/search/view';
import GlobeView from './views/globe/view';

import './popup.sass';

function CrsPopup({ onClose }) {
    const state = useSelector(state => state.popups.isChanging);

    return (
        <Popup isOpen={state}>
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