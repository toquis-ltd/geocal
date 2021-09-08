import CRS from '../@types/CRS';

type settings = {
    modifiedCRS: 'source' | 'target',
    source:CRS,
    target:CRS,
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