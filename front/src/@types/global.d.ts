import {
    TransformationDimentionEnum,
    NumberOfTranfromationsEnum,
    FormatVerificationOutputEnum,
    FileFormatEnum
    } from '../enums/settings';

import {PJEnum, UnityEnume} from '../enums/crs';

declare  global {

    interface TransformationDefinition {
        name: string
        code: string
        area: number[]
    }

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

    interface PointCoordinate {
        lat: number
        long: number
        height?: number
    }

    interface CRSModelType {
        auth_name: string
        code: string
        name: string
        type: PJEnum
        deprecated: boolean
        area_of_use_name: string
        projection_method_name: string
        area_bounds: float[]
        unit: UnitEnume
    }

    interface CRSListStateType {
        CRSList: CRSModelType[]
        setCRSList:(c:CRSListStateType)=>void,
    }

    interface SettingStateType {
        isHeightIncluded:boolean,
        transformationsNumber:NumberOfTranfromationsEnum,
        dataOutputFormat: FormatVerificationOutputEnum,
        outputFile: FileFormatEnum,
        transformationsItems:CRSModelType[]
        pipeIds:number[]
        setState:(c:SettingStateType)=>void,
    };
}

export {};