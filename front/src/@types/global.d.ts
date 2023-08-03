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

    interface SettingStateType {
        dimensions:TransformationDimentionEnum,
        Transformations:NumberOfTranfromationsEnum,
        dataOutputFormat: FormatVerificationOutputEnum,
        outputFile: FileFormatEnum,
        setState:(c:SettingStateType)=>void,
    };
}

export {};