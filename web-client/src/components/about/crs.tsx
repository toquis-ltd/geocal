import { useSelector } from "react-redux"
import { RootState } from "reducers"

type Props  = {
    name: 'source' | 'target'
}

export default function CrsDecription({name}:Props) {
    const data = useSelector(({settings}:RootState)=>settings[name])
    return (
            <div className={`about__colomn about__${name}`}>
                <h4> About {name} coordinate referance system </h4>
                <div className="about__bounds">
                    <h5> Name: {data.name} </h5>
                    EPSG: {data.code} <br/>
                    is Projected: {(data.isProjected) ? 'Yes' : 'No'} <br/>
                    <title> WGS84 borders</title>
                    <ul>
                        <li>west: {data.bounds?.westBoundLon} - east:{data.bounds?.eastBoundLon}</li>
                        <li>north: {data.bounds?.northBoundLat} - south: {data.bounds?.southBoundLat}</li>
                    </ul>
                </div>
            </div>
    )
}