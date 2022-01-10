export const setQwery = (value:String) => {
    return {
        type: 'crs/setQwery',
        payload: value
    }
}

export const setResult = (value:any) => {
    return {
        type: 'crs/setResult',
        payload:  value
    }
}

export const togglePopup = (state:boolean) => {
    return {
        type: 'crs/toggle',
        payload: state
    }
}

export const toggleTransformPopup = (state:boolean) => {
    return {
        type: 'transformation/toggle',
        payload: state
    }
}