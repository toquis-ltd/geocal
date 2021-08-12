import {Action} from './index';

const SettingsReducer = (state=false, action:Action) => {
    switch (action.type) {
        default:
            return state;
    };

};

export default SettingsReducer;