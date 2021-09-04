import { useEffect, useState } from "react";
import { DefaultRootState, useDispatch, useSelector } from "react-redux";
import _ from 'underscore';

import { setQwery, setResult } from "actions/popups";

import { fetchCRSList } from "components/settings/crs-selector/popup/api";

export default function useSearchBar() {
    const dispatch = useDispatch();
    const [localState, handleLocalState] = useState<string>('');
    const state = useSelector(({popups}:DefaultRootState) => popups.qwery, _.isEqual);
    const fetchListHandle = (value?:string) => {
        fetchCRSList(value || localState).then(res => {
            dispatch(setQwery(value || localState));
            dispatch(setResult(res));
        })
    }
    useEffect(() => {
        handleLocalState(state);
    }, [state])
    return [localState, handleLocalState, fetchListHandle]
}