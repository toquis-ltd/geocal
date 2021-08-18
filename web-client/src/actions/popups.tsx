export const setQwery = (value) => {
    return {
        type: 'crs/setQwery',
        payload: value
    }
}

export const setResult = (value) => {
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