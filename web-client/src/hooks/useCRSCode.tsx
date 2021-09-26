import { DefaultRootState, useSelector } from "react-redux"

type crs = 'source' | 'target';

export default function useCRSCode (origin:crs) {
    const code = useSelector(({settings}:DefaultRootState) => settings[origin].code)
    return code;
}