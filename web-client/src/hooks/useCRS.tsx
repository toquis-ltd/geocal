import { setCRS } from "actions/settings";
import { fetchProj4 } from "components/settings/crs-selector/popup/api";
import { useDispatch, useSelector } from "react-redux";

type crs = {
    name:string,
    code:number,
    unityOfMeasure?:string,
}

export default function useCRS () {
    const dispatch = useDispatch();
    const set = (item:crs) => {
        fetchProj4(item.code).then((res:string)=>{
            dispatch(setCRS({
                name: item.name,
                code: item.code,
                uom: item.unityOfMeasure,
                proj4: res
            }));
        });
    };
    return set
}