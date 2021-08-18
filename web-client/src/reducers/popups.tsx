
type State = {
    isChanging: boolean,
    qwery: String,
    result: Array<any>,
};

const PopupReducer = (state:State = {isChanging: false, qwery: '', result: [],} , action:any) => {
    switch (action.type) {

        case 'crs/toggle':
            return {...state, isChanging:(!state.isChanging) };
        
        case 'crs/setQwery':
            return {...state, qwery:action.payload};
        
        case 'crs/setResult':
            return {...state, result:action.payload};

        default:
            return state;
    };

};

export default PopupReducer;