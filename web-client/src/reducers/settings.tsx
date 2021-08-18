const SettingsReducer = (state={modifiedCRS:'source', source:{},target:{}}, action:any) => {
    switch (action.type) {
        case 'setOrigin':
            return {...state, modifiedCRS: action.payload}

        case 'setCRS':
            return {...state, [state.modifiedCRS]:action.payload}
        
        default:
            return state;
    };

};

export default SettingsReducer;