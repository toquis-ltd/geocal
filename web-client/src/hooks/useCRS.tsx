import CRS from '../@types/CRS'

import { useDispatch } from "react-redux";
import { fetchAboutCRS } from "components/settings/crs-selector/popup/api";
import { setCRS } from "actions/settings";

interface Selected extends CRS {
    code:number,
}

export default function useCRS () {
    const dispatch = useDispatch();
    const set = (item:Selected) => {
        fetchAboutCRS(item?.code).then((res:any)=>{
            dispatch(setCRS({...res}));
        });
    };
    return set
}