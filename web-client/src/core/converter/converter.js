import {conversion} from '../api/api'

export const fields = {
    source: {
        x:0,
        y:0,
        z:0,
    },
    target: {
    },
};

export const convert = () => {
    conversion().then((data)=>{
        fields.target = {
            ...data
        }
    });
}