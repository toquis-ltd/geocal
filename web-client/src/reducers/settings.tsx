import CRS from '../@types/CRS';

export interface Transformation {
    name: string,
    area?: string,
    accuracy?: string,
    wkt: string,
}

type settings = {
    modifiedCRS: 'source' | 'target',
    source:CRS,
    target:CRS,
    zAxe:boolean,
    DMS:boolean,
    transform?: Transformation | undefined,
}

const  _default:settings = {
    modifiedCRS:'source',
    source:{},
    target:{},
    zAxe:false,
    DMS:false,
    transform: {
       name: 'No Transformationnnn',
       wkt: 'No Transformation'
    }
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