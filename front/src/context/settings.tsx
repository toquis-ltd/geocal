import React from 'react';

import {
    NumberOfTranfromationsEnum,
    FormatVerificationOutputEnum,
    FileFormatEnum
} from '../enums/settings';

export const SettingsContext = React.createContext<SettingStateType>({
    isHeightIncluded:false,
    transformationsNumber: NumberOfTranfromationsEnum.One,
    dataOutputFormat: FormatVerificationOutputEnum.DecimalDegrees,
    outputFile: FileFormatEnum.csv,
    transformationsItems: [],
    areaOfUse: {lat:0.0, long:0.0},
    pipeIds:[],
    setState: () => {},
} as SettingStateType);