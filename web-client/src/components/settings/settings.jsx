import './settings.css';

import CrsSelector from './crs-selector/crs-selector'
import {source, target} from './parameters.js';
import ConverterPropretiesBtn from './button/global'

function Settings() {
    
    return (
        <div className="converter__settings">
            <CrsSelector parameters={source}/>
            <ConverterPropretiesBtn/>
            <CrsSelector parameters={target}/>
        </div>
    );
}

export default Settings;