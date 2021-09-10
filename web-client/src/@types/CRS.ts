type bounds = {
    northBoundLat: number,
    southBoundLat: number,
    westBoundLon:number,
    eastBoundLon:number,
}
type ellipsoid = {
    name:string,
    semiMajorAxis:string,
    invFlattening:string,
    ellipsoidShape:boolean,
}

type CS = {
    name:string,
    type: string,
    dimension: number,
}

type datum = {
    name:string,
    type: string,
    description: string,
}

export default interface CRS {
    code?: number,
    name?: string,
    unityOfMeasure?: string,
    bounds?: bounds,
    ellipsoid?:ellipsoid,
    coordinateSystem?:CS,
    datum?:datum,
    kind?: string,
    projectionMethod?:string
    proj4?: string,
    wkt?: string,
}