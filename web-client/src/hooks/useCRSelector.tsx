import { useSelector } from "react-redux";
import { RootState } from "reducers";

type prop = "source" | "target";

export function useCRSelector(origin:prop){
    
    const self = useSelector((state:RootState) => state.settings[origin]);
    const oppositName = origin === 'source' ? 'target' : 'source';
    const other = useSelector((state:RootState)  => state.settings[oppositName]);

    return [self, other];
}