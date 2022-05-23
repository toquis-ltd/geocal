import { useSelector } from 'react-redux';
import CrsSelector from './crs-selector/crs-selector'
import settingContext from './settingContext';

import './settings.css';

const common = {
    title: ' coordinate reference system'
};

const sourceContext = {
    title: ('Source'+common.title),
    origin: "source",
};

const targetContext0 = {
    title:('Target'+common.title),
    origin: 'target',
};

const targetContext1 = {
    title:('Target 2'+common.title),
    origin: 'target1',
};

function Settings() {
    const IsDoubleTransforming = useSelector(state => state.settings.ST)
    return (
        <div className="converter__settings">
            <settingContext.Provider value = {sourceContext}>
                <CrsSelector />
            </settingContext.Provider>
            <settingContext.Provider value = {targetContext0}>
                <CrsSelector />
            </settingContext.Provider>
            {IsDoubleTransforming && 
            <settingContext.Provider value = {targetContext1}>
                <CrsSelector />
            </settingContext.Provider>
            }
            
        </div>
    );
}

export default Settings;