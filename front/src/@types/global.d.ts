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


    // 200 represents square deg area, wich crs should not over pass
    // to better understand, consider to read back/core/search code
    interface CRSArea {
        lat: number
        long: number
        areaSize: number = 200
    }

    interface CRSModelType {
        auth_name: string
        code: string
        name: string
        type: PJEnum
        deprecated: boolean
        area_of_use_name: string
        projection_method_name: string
        accuracy: string
    }

    interface CRSListStateType {
        CRSList: CRSModelType[]
        setCRSList:(c:CRSListStateType)=>void,
    }

    interface SettingStateType {
        isHeightIncluded:boolean,
        transformations:NumberOfTranfromationsEnum,
        dataOutputFormat: FormatVerificationOutputEnum,
        outputFile: FileFormatEnum,
        areaOfUse: CRSArea
        setState:(c:SettingStateType)=>void,
    };
}

export {};