import CRS from '../@types/CRS';

type settings = {
    modifiedCRS: 'source' | 'target',
    zAxe:boolean,
    source:CRS,
    target:CRS,
}

const SettingsReducer = (state:settings = {zAxe:true, modifiedCRS:'source', source:{}, target:{}}, action:any) => {
    switch (action.type) {
        case 'setOrigin':
            return {...state, modifiedCRS:action.payload}

        case 'setCRS':
            return {...state, [state.modifiedCRS]:action.payload}
        
        case 'toggleZAxe':
                return {...state, zAxe:action.payload}
        
        default:
            return state;
    };

};

export default SettingsReducer;