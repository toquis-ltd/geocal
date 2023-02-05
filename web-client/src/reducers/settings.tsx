const _default:settings = {
    modifiedCRS:'source',
    source:{},
    target:{},
    target1:{},
    zAxe:false,
    DMS:false,
    ST:false,
    transform: {
       name: 'No Transformationnnn',
       wkt: 'No Transformation'
    },
    version: "0.0.1",
};

const SettingsReducer = (state:settings = _default, action:any) => {
    switch (action.type) {
        case 'setOrigin':
            return {...state, modifiedCRS:action.payload}

        case 'setCRS':
            return {...state, [state.modifiedCRS]:action.payload}
        
        case 'toggleZAxe':
                return {...state, zAxe:action.payload}
        
        case 'toggleDMS':
            return {...state, DMS:action.payload}
        
        case 'toggleST':
                return {...state, ST:action.payload}

        case 'setTransform':
            if (typeof action.payload === typeof state.transform ){
                return {...state, transform: action.payload}
            }
            return {...state}

        default:
            return state;
    };

};

export default SettingsReducer;