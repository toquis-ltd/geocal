import { DefaultRootState, useSelector } from "react-redux"

type crs = 'source' | 'target' | 'target1';

export default function useCRSCode (origin:crs) {
    return useSelector(({settings}:DefaultRootState) => settings[origin]?.code);
}