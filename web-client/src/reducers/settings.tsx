import CRS from '../@types/CRS';

type settings = {
    modifiedCRS: 'source' | 'target',
    source:CRS,
    target:CRS,
    zAxe:boolean,
    DMS:boolean,
}

const  _default:settings = {
    modifiedCRS:'source',
    source:{},
    target:{},
    zAxe:false,
    DMS:false,
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

        default:
            return state;
    };

};

export default SettingsReducer;