type crsHeandler = {
    type: String,
    payload: payload
};

type payload = {
        origin: String,
        code?: Number,
        uom?: String,
        area?: String,
        proj4?: String,
};

export const setCRS = ({}:payload):crsHeandler => {
    return {
        type: 'setCRS',
        payload: {
            origin: ''
        }
    };
};