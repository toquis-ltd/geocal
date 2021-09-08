import { DefaultRootState, useSelector } from "react-redux"

type crs = 'source' | 'target'

export default function useCRSUnity (origin:crs) {
    const unity = useSelector(({settings}:DefaultRootState) => settings[origin].unityOfMeasure)
    const deglist = ['degree', 'unknown', 'sexagesimal', ' DMS.s'];
    if (deglist.includes(unity+'')) return ['Longitude', 'Latitude', 'Altitude'];
    return ['X', 'Y', 'Z'];
}