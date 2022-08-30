declare global { 
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


}
export {};