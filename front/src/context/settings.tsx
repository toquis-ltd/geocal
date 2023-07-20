import * as React from 'react';
import { SettingStateType } from '../types/settings';

export const SettingsContext = React.createContext<SettingStateType>({
    dimensions:2,
    transformations:1,
    dataOutputFormat:'Decimal Degrees',
} as SettingStateType);