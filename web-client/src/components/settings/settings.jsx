import './settings.css';

import CrsSelector from './components/crs-selector/crs-selector';
import {source, target} from './components/crs-selector/parameters.js';

function Settings({}) {
    return (
        <div className="converter__settings">
            {[source, target].map((obj, index)=><CrsSelector parameters={obj} key={index}/>)}
        </div>
    );
}

export default Settings;