
type State = {
    isChangingCRS: boolean,
    isChangingTransform: boolean,
    qwery: String,
    result: Array<any>,
};

const defaultState =  {
                        isChangingCRS: false,
                        isChangingTransform:false,
                        qwery: '',
                        result: [],
                    }

const PopupReducer = (state:State = defaultState, action:any) => {
    switch (action.type) {

        case 'crs/toggle':
            return {...state, isChangingCRS:(!state.isChangingCRS) };
            
        case 'transformation/toggle':
            return {...state, isChangingTransform:(!state.isChangingTransform) };
        
        case 'crs/setQwery':
            return {...state, qwery:action.payload};
        
        case 'crs/setResult':
            return {...state, result:action.payload};

        default:
            return state;
    };

};

export default PopupReducer;