import {
    TransformationDimentionEnum,
    NumberOfTranfromationsEnum,
    FormatVerificationOutputEnum,
    FileFormatEnum
    } from '../enums/settings';

import {PJEnum} from '../enums/crs';

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
        areaOfUse: PointCoordinate
        transformationsItems:CRSModelType[]
        setState:(c:SettingStateType)=>void,
    };
}

export {};