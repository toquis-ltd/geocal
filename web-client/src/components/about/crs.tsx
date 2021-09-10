import { useSelector } from "react-redux"
import { RootState } from "reducers"

type Props  = {
    name: 'source' | 'target'
}

export default function CrsDecription({name}:Props) {
    const data = useSelector(({settings}:RootState)=>settings[name])
    return (
            <div className={`about__colomn about__colomn-crs about__colomn-${name}`}>
                <h4 className='about__colomn-title'> About {name} coordinate referance system </h4>
                <div className="about__base">
                    <h4 className="about__block-title">Base:</h4>
                    <ul className="about__list">
                        <li className="about__description about__code">EPSG: {data.code}</li>
                        <li className="about__description about__name">Name: {data.name}</li>
                        <li className="about__description about__kind">Kind: {data.kind}</li>
                        <li className="about__description about__bounds">
                            WGS84 borders:
                            <ul className="about__list">
                                <li className="about__bounds-item">west: {data.bounds?.westBoundLon} - east:{data.bounds?.eastBoundLon}</li>
                                <li className="about__bounds-item">north: {data.bounds?.northBoundLat} - south: {data.bounds?.southBoundLat}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="about__advance">
                    <h4 className="about__block-title">Advance:</h4>
                    <ul className="about__list">
                        { (data.ellipsoid) ?
                            <li className="about__description about__code">
                                Elipsoid: {data.ellipsoid.name}
                                <ul className="about__list about__elispoid">
                                    <li className="about__bounds-item">Semi major axis: {data.ellipsoid.semiMajorAxis}</li>
                                    <li className="about__bounds-item">Inverse flattening: {data.ellipsoid.invFlattening}</li>
                                </ul>
                            </li>:null
                        }
                    </ul>
                    <ul className="about__list">
                        { (data.coordinateSystem) ?
                            <li className="about__description about__code">
                                Datum:
                                <ul className="about__list about__elispoid">
                                    <li className="about__bounds-item">Name: {data.coordinateSystem.name}</li>
                                    <li className="about__bounds-item">Type: {data.coordinateSystem.type}</li>
                                    <li className="about__bounds-item">Dimension: {data.coordinateSystem.dimension}</li>
                                </ul>
                            </li>:null
                        }
                    </ul>
                </div>
            </div>
    )
}