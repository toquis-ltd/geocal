import {
    TransformationDimentionEnum,
    NumberOfTranfromationsEnum,
    FormatVerificationOutputEnum,
    FileFormatEnum
    } from '../enums/settings';

declare  global {
    interface OneTransformation {
        sourceEPSG: number
        targetEPSG: number
        transformationIndex: number
    }

    interface TwoTransformation {
        sourceEPSG: number
        middleEPSG: number
        targetEPSG: number
        FirstTransformationIndex: number
        SecondTransformationIndex: number
    }
    
    interface PointTransformation {
        transform : OneTransformation | TwoTransformation
        point:{
            x:number
            y:number
        }
    }

    interface FileTransformation {
        transform : OneTransformation | TwoTransformation
        file:File
    }


    // 200 represents square deg area, wich crs should not over pass
    // to better understand, consider to read back/core/search code
    interface CRSArea {
        lat: number
        lon: number
        areaSize: number = 200
    }

    interface SettingStateType {
        isHeightIncluded:TransformationDimentionEnum,
        Transformations:NumberOfTranfromationsEnum,
        dataOutputFormat: FormatVerificationOutputEnum,
        outputFile: FileFormatEnum,
        areaOfUse: CRSArea
        setState:(c:SettingStateType)=>void,
    };
}

export {};