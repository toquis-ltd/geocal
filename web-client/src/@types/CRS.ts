type bounds = {
    northBoundLat: number,
    southBoundLat: number,
    westBoundLon:number,
    eastBoundLon:number,
}

export default interface CRS {
    code?: number,
    name?: string,
    unityOfMeasure?: string,
    bounds?: bounds,
    isProjected?: boolean,
    projectionMethod?: string,
    proj4?: string,
    wkt?: string,
}