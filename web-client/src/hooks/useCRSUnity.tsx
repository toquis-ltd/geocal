import { DefaultRootState, useSelector } from "react-redux"

type crs = 'source' | 'target'

export default function useCRSUnity (origin:crs) {
    const unity = useSelector(({settings}:DefaultRootState) => settings[origin].uom)
    if (unity === 'metre') {
        return ['X', 'Y', 'Z']
    }
    return ['Latitude', 'Longitude', 'Altitude']
}