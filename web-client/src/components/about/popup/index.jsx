import { useState } from 'react';
import { useSelector } from 'react-redux';

import Popup from 'components/common/popup/popup';
import Interface from 'components/common/popup/interface/menu-bar/menu';

import TransformationView from './views/List';
import CustomeTransformationView from './views/Costume';

import './popup.sass';


function TransformationPopup({ onClose }) {
    const state = useSelector(state => state.popups.isChangingTransform);
    const [isImporting, toggleImported] = useState(false);

    const close = () => {
        toggleImported(false);
        onClose();
    }

    return (
        <Popup isOpen={state} name='transform'>
            <Interface onClose={close}/>
            <div className="view--transform">
                <div className="view__inner--transform">
                    {
                        (isImporting) ?
                            <CustomeTransformationView onClose={onClose} onImport={() => toggleImported(false)}/>
                        :
                            <TransformationView onClose={() => toggleImported(true)} onImport={() => toggleImported(true)}/>
                    }
                </div>
            </div>
        </Popup>
    )
}

export default TransformationPopup;