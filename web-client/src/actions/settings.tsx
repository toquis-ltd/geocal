type crsHeandler = {
    type: String,
    payload: payload
};

type payload = {
        name: String,
        code?: Number,
        uom?: String,
        area?: String,
        proj4?: String,
};

export const setCRS = (payload:payload):crsHeandler => {
    return {
        type: 'setCRS',
        payload: {...payload}
    };
};

export const setOrigin = (payload) => {
    return {
        type: 'setOrigin',
        payload: payload
    }
}