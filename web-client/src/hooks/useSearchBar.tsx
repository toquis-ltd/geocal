import { DefaultRootState, useDispatch, useSelector } from "react-redux";
import { setQwery, setResult } from "actions/popups";
import { fetchCRSList } from "components/settings/crs-selector/popup/api";

export default function useSearchBar() {
    const dispatch = useDispatch();
    const state = useSelector(({popups}:DefaultRootState) => popups.qwery);
    const changeHandle = (value:string) => dispatch(setQwery(value));
    const fetchListHandle = (value?:string) => {
        fetchCRSList(value || state).then(res => {
            dispatch(setResult(res));
        })
    }
    return [state, changeHandle, fetchListHandle]
}