function cleanText(value){
    const toRemove = new RegExp(/"/, 'g');
    const space = new RegExp(/_/, 'g');
    return value.replace(space, ' ').replace(toRemove, '')
}


export function parseProjection(wkt) {
    const re = /PROJECTION\[(.*?)\]/;
    const projection = wkt.match(re)
    if (projection)
        return cleanText(projection[1])
    return null
}

export function parseParameters(wkt) {
    const re = new RegExp(/PARAMETER\[(.*?)\]/, 'g');
    const list = Array.from(wkt.matchAll(re), item => item[1]);

    const lineToObject = value => {
        const separator = new RegExp(/,/, 'g');
        const item = value.split(separator).map(i => cleanText(i));
        return {name:item[0], value:item[1]}
    }

    const res = list.map(value =>  lineToObject(value));
    if (res)
        return res
    return []
}