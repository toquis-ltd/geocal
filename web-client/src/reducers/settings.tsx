type settings = {
    modifiedCRS: 'source' | 'target',
    source:crs,
    target:crs,
}

type crs = {
    name?:String,
    code?:number,
    uom?:String,
    proj4?:String;
}

const SettingsReducer = (state:settings = {modifiedCRS:'source', source:{}, target:{}}, action:any) => {
    switch (action.type) {
        case 'setOrigin':
            return {...state, modifiedCRS:action.payload}

        case 'setCRS':
            return {...state, [state.modifiedCRS]:action.payload}
        
        default:
            return state;
    };

};

export default SettingsReducer;