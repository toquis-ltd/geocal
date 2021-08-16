const SettingsReducer = (state:String, action:any) => {
    switch (action.type) {
        case 'setCRS':
            return state = action.payload.value

        default:
            return {
                
            };
    };

};

export default SettingsReducer;