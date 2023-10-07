import {
    TransformationDimentionEnum,
    NumberOfTranfromationsEnum,
    FileFormatEnum,
    ResultFormatEnum
    } from '../enums/settings';

import {PJEnum, UnityEnume} from '../enums/crs';

declare  global {

    interface TransformationDefinition {
        name: string
        code: string
        area: number[]
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
        unit: UnitEnum
    }

    interface CRSListStateType {
        CRSList: CRSModelType[]
        setCRSList:(c:CRSListStateType)=>void,
    }

    interface SettingStateType {
        isHeightIncluded:boolean,
        transformationsNumber:NumberOfTranfromationsEnum,
        dataOutputFormat: ResultFormatEnum,
        outputFile: FileFormatEnum,
        transformationsItems:CRSModelType[],
        pipeIds:number[],
        setState:(c:SettingStateType)=>void,
    };
}

export {};