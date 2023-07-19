declare global {
    interface Transformation {
        sourceEPSG: number
        targetEPSG: number
        transformationIndex: number
    }
    
    interface PointTransformation {
        transform : Transformation
        point:{
            x:number
            y:number
        }
    }
}

export {}
  