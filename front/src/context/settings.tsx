import React from 'react';

import {
    NumberOfTranfromationsEnum,
    FileFormatEnum,
    ResultFormatEnum,
} from '../enums/settings';

export const SettingsContext = React.createContext<SettingStateType>({
    isHeightIncluded:false,
    transformationsNumber: NumberOfTranfromationsEnum.One,
    dataOutputFormat: ResultFormatEnum.DD,
    outputFile: FileFormatEnum.csv,
    transformationsItems: [],
    pipeIds:[],
    setState: () => {},
} as SettingStateType);