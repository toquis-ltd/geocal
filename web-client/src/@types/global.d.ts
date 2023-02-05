export {};

declare global {
    interface Transformation {
        name: string,
        area?: string,
        accuracy?: string,
        wkt: string,
    }
    
    interface settings {
        modifiedCRS: 'source' | 'target' |  'target1',
        source:CRS,
        target:CRS,
        target1:CRS,
        zAxe:boolean,
        DMS:boolean,
        ST:boolean,
        transform?: Transformation | undefined,
        version: string,
    }
    
    interface CRS {
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

    type Point = {
        x?: string
        y?: string
        z?: string
      
    };
}