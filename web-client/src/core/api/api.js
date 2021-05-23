import settings from '../converter/settings'
import {fields} from '../converter/converter'

export async function conversion() {
    const url = `${process.env.REACT_APP_HOST}/api/transform/?format=json`;
    const parameters = `&s_crs=${settings.source.code}&t_crs=${settings.source.code}`;
    const coordinates = `&source_x=${fields.source.x}&source_y=${fields.source.y}&source_z=${fields.source.z}`;

    return await (await fetch(url+parameters+coordinates).catch()).json();  
}