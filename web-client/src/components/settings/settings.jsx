import './settings.css';

import CrsSelector from './crs-selector/crs-selector'
import {source, target} from './parameters.js';


function Settings() {
    
    return (
        <div className="converter__settings">
            <CrsSelector parameters={source}/>
            <CrsSelector parameters={target}/>
        </div>
    );
}

export default Settings;