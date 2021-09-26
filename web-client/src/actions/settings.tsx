type crsHeandler = {
    type: string,
    payload: payload
};

type payload = {
        name: string,
        code?: number,
        uom?: string,
        area?: string,
        proj4?: string,
};

type origin = 'source' | 'target'

export const setCRS = (payload:payload):crsHeandler => {
    return {
        type: 'setCRS',
        payload: {...payload}
    };
};

export const setOrigin = (payload:origin) => {
    return {
        type: 'setOrigin',
        payload: payload
    }
}

export const toggleZAxe = (payload:boolean) => {
    return {
        type: 'toggleZAxe',
        payload: payload
    }
}