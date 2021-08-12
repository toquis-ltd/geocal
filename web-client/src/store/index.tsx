import { createStore } from '@reduxjs/toolkit'

import AllReducers from '../reducers';

const store = createStore(
        AllReducers,  
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );

export default store;