import { useSelector } from "react-redux";
import { RootState } from "reducers";

export default function useCRSelector(){
    
    const _origin = useSelector(({settings}:RootState) => settings.modifiedCRS);
    const origin = (_origin === 'source') ? 'source' : 'target';

    const self = useSelector((state:RootState) => state.settings[origin]);
    
    const oppositName = origin === 'source' ? 'target' : 'source';
    const other = useSelector((state:RootState)  => state.settings[oppositName]);

    return [self, other, origin];
}