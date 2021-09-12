function cleanText(value){
    const toRemove = new RegExp(/\"/, 'g');
    const space = new RegExp(/\_/, 'g');
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
        const separator = new RegExp(/\,/, 'g');
        const item = value.split(separator).map(i => cleanText(i));
        return {name:item[0], value:item[1]}
    }

    const res = list.map(value =>  lineToObject(value));
    if (res)
        return res
    return []
}

const wkt = "PROJCS[\"Anguilla 1957 / British West Indies Grid\",\n    GEOGCS[\"Anguilla 1957\",\n        DATUM[\"Anguilla_1957\",\n            SPHEROID[\"Clarke 1880 (RGS)\",6378249.145,293.465,\n                AUTHORITY[\"EPSG\",\"7012\"]],\n            AUTHORITY[\"EPSG\",\"6600\"]],\n        PRIMEM[\"Greenwich\",0,\n            AUTHORITY[\"EPSG\",\"8901\"]],\n        UNIT[\"degree\",0.0174532925199433,\n            AUTHORITY[\"EPSG\",\"9122\"]],\n        AUTHORITY[\"EPSG\",\"4600\"]],\n    PROJECTION[\"Transverse_Mercator\"],\n    PARAMETER[\"latitude_of_origin\",0],\n    PARAMETER[\"central_meridian\",-62],\n    PARAMETER[\"scale_factor\",0.9995],\n    PARAMETER[\"false_easting\",400000],\n    PARAMETER[\"false_northing\",0],\n    UNIT[\"metre\",1,\n        AUTHORITY[\"EPSG\",\"9001\"]],\n    AXIS[\"Easting\",EAST],\n    AXIS[\"Northing\",NORTH],\n    AUTHORITY[\"EPSG\",\"2000\"]]"
console.log(parseProjection(wkt));