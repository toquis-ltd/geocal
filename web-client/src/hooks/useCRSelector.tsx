import { useSelector } from "react-redux";
import { RootState } from "reducers";


type Props = 'source' | 'target' | 'target1' | undefined;

export default function useCRSelector(_origin:Props=undefined){
    
    const _global_origin =  useSelector(({settings}:RootState) => settings.modifiedCRS);
    const _local_origin = _origin || _global_origin;
    
    const origin = (_local_origin === 'source') ? 'source' : 'target';

    const self = useSelector((state:RootState) => state.settings[origin]);
    
    const oppositName = origin === 'source' ? 'target' : 'source';
    const other = useSelector((state:RootState)  => state.settings[oppositName]);

    return [self, other, origin];
}