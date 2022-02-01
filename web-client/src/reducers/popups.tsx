
type State = {
    isChangingCRS: boolean,
    isChangingTransform: boolean,
    isReporting: boolean,
    qwery: String,
    result: Array<any>,
};

const defaultState =  {
                        isChangingCRS: false,
                        isChangingTransform:false,
                        isReporting:false,
                        qwery: '',
                        result: [],
                    }

const PopupReducer = (state:State = defaultState, action:any) => {
    switch (action.type) {

        case 'crs/toggle':
            return {...state, isChangingCRS:(!state.isChangingCRS) };
            
        case 'transformation/toggle':
            return {...state, isChangingTransform:(!state.isChangingTransform) };
        
        case 'repport/toggle':
            return {...state, isReporting:(!state.isReporting) };

        case 'crs/setQwery':
            return {...state, qwery:action.payload};
        
        case 'crs/setResult':
            return {...state, result:action.payload};

        default:
            return state;
    };

};

export default PopupReducer;