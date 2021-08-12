import { combineReducers } from "redux";

import PopupReducer from "./popups";
import SettingsReducer from "./settings";
import HistoryReducer from "./histories";

export interface Action {
    type: string,
    payload?: string,

};

const AllReducers = combineReducers({
    popups: PopupReducer,
    settings: SettingsReducer,
    history: HistoryReducer,
});

export default AllReducers;