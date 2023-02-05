import { createStore } from '@reduxjs/toolkit'
import { saveState, loadState } from './persist';


import rootReducer from '../reducers';

const throttle = require('lodash.throttle');

const persistantState = loadState();

const store = createStore(
        rootReducer,
        persistantState,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );

store.subscribe(throttle(() => {
    saveState({
            settings: store.getState().settings,
        });
    }, 1000));

export default store;