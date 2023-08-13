import React from 'react';

import {
    TransformationDimentionEnum,
    NumberOfTranfromationsEnum,
    FormatVerificationOutputEnum,
    FileFormatEnum
} from '../enums/settings';

export const SettingsContext = React.createContext<SettingStateType>({
    isHeightIncluded:TransformationDimentionEnum.TwoDimentions,
    transformations: NumberOfTranfromationsEnum.One,
    dataOutputFormat: FormatVerificationOutputEnum.DecimalDegrees,
    outputFile: FileFormatEnum.csv,
    areaOfUse: {lat:0.0, long:0.0, areaSize:200},
    setState: () => {},
} as SettingStateType);
