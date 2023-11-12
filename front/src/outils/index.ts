export function getLastVisibleSelectedCRSIndex(state:SettingStateType)  {
    // This fonction return the number of the last showen to user CRS
    if ((state.transformationsNumber+1) < state.transformationsItems.length ) {
        return  state.transformationsNumber+1 as number 
    }
    return (state.transformationsItems.length - 1)
}