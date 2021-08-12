import {Action} from './index';

const PopupReducer = (state=false, action:Action) => {

    switch (action.type) {
        case 'TOGGLE':
            return !state;
        default:
            return state;
    };

};

export default PopupReducer;