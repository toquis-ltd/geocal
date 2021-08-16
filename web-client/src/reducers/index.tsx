import { combineReducers,  } from "redux";

import PopupReducer from "./popups";
import SettingsReducer from "./settings";
import HistoryReducer from "./histories";

const rootReducer = combineReducers({
    popups: PopupReducer,
    settings: SettingsReducer,
    history: HistoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;