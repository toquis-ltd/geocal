import React from 'react';
import { SettingStateType } from '../enums/settings';

import {
    TransformationDimentionEnum,
    NumberOfTranfromationsEnum,
    FormatVerificationOutputEnum,
    FileFormatEnum
} from '../enums/settings';

export const SettingsContext = React.createContext<SettingStateType>({
    dimensions:TransformationDimentionEnum.TwoDimentions,
    transformations: NumberOfTranfromationsEnum.One,
    dataOutputFormat: FormatVerificationOutputEnum.DecimalDegrees,
    outputFile: FileFormatEnum.csv,
    setState: () => {},
} as SettingStateType);
