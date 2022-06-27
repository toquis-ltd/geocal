export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      
      if (serializedState === null) {
        return undefined;
      }
      
      const state = JSON.parse(serializedState);

      if (process.env.REACT_APP_VERSION !== state.settings.version){
        return undefined;
      }

      return state;

    } catch (err) {
      return undefined;
    }
  };
  
export const saveState = (state:any) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
};