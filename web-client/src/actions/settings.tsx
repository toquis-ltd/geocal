interface crsHeandler  {
    type: string,
    payload: payload
};

interface payload  {
    name: string,
    code?: number,
    uom?: string,
    area?: string,
    proj4?: string,
};

type origin = 'source' | 'target' | 'target1'; 

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

export const toggleDMS = (payload:boolean) => {
    return {
        type: 'toggleDMS',
        payload: payload
    }
}

export const toggleST = (payload:boolean) => {
    return {
        type: 'toggleST',
        payload: payload
    }
}

export const setTransform = ( payload:Transformation  ) => {
    return {
        type: 'setTransform',
        payload: payload
    }
}