import React from 'react';

export const CRSContext = React.createContext<CRSListStateType>({
    CRSList:[],
    setCRSList: () => {}
});