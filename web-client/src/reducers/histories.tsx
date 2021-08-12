import {Action} from './index';

const HistoryReducer = (state=false, action:Action) => {
    switch (action.type) {
        default:
            return state;
    };

};

export default HistoryReducer;