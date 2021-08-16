
type State = {
    crsPopup: boolean,
    qwery: String,
    result: [],
};

const PopupReducer = (state:State, action:any) => {
    switch (action.type) {

        case 'crs/toggle':
            return false;
        
        case 'crs/setQwery':
            return {...state, qwery:action.payload};
        
        case 'crs/setResult':
            return {...state, result:action.payload};

        default:
            return {
                crsPopup: false,
                qwery: '',
                result: [],
            };
    };

};

export default PopupReducer;