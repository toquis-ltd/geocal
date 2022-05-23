import { useSelector } from "react-redux"
import { RootState } from "reducers"

import {parseProjection, parseParameters} from './parseWKT'

type Props  = {
    name: 'source' | 'target'
}
function BaseInformation({data}:any){
    return (
        <div className="about__base" key='base'>
            <h4 className="about__block-title">Base:</h4>
            <ul className="about__list">
                <li className="about__description about__name" key={data.name}>Name: {data.name}</li>
                <li className="about__description about__code" key={data.code}>EPSG: {data.code}</li>
                <li className="about__description about__kind" key={data.unityOfMeasure}>Unity:{data.unityOfMeasure}</li>
                <li className="about__description about__kind" key={data.kind}>Kind: {data.kind}</li>
                <li className="about__description about__bounds" key='borders'>
                    WGS84 borders:
                    <ul className="about__list borders__list">
                        <li className="about__bounds-item">west: {data.bounds?.westBoundLon} - east:{data.bounds?.eastBoundLon}</li>
                        <li className="about__bounds-item">north: {data.bounds?.northBoundLat} - south: {data.bounds?.southBoundLat}</li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}


function Elipsoid({data}:any){
    return (
            <ul className="about__list">
                        { (data.ellipsoid) ?
                            <li className="about__description ellipsoid about__code">
                                Elipsoid: {data.ellipsoid.name}
                                <ul className="about__list about__elispoid">
                                    <li className="about__bounds-item">Semi major axis: {data.ellipsoid.semiMajorAxis}</li>
                                    <li className="about__bounds-item">Inverse flattening: {data.ellipsoid.invFlattening}</li>
                                </ul>
                            </li>:null
                        }
            </ul>
    )
}
function CoordinateSystem({data}:any){
    return (
        <ul className="about__list">
                { (data.coordinateSystem) ?
                    <li className="about__description about__code">
                        Coordinate System:
                        <ul className="about__list about__coordinate-system">
                            <li className="about__bounds-item">Name: {data.coordinateSystem.name}</li>
                            <li className="about__bounds-item">Type: {data.coordinateSystem.type}</li>
                            <li className="about__bounds-item">Dimension: {data.coordinateSystem.dimension}</li>
                            
                            { (parseProjection(data?.wkt)) ? 
                                <li className="about__bounds-item" key='wkt'>Projection: {parseProjection(data?.wkt)}</li>:null
                            }
                            { parseParameters(data?.wkt)?.map(
                                item =><li className="about__bounds-item" key={item.name}>{item.name}: {item.value}</li>
                            )}
                        
                        </ul>
                    </li>:null
                }
        </ul>
    )
}

function Datum({data}:any){
    return (       
        <ul className="about__list">
            { (data.datum) ?
                <li className="about__description datum about__code">
                    Datum:
                    <ul className="about__list about__datum" >
                        <li className="about__bounds-item" key={data.datum.name}>Name: {data.datum.name}</li>
                        <li className="about__bounds-item" key={data.datum.type}>Type: {data.datum.type}</li>
                    </ul>
                </li>:null
            }
        </ul>
    )
}
export default function AboutItem({name}:Props) {
    const data = useSelector(({settings}:RootState)=>settings[name])
    return (
            <div className={`about__colomn about__colomn-crs about__colomn-${name}`}>
                <h4 className='about__colomn-title'> About {name} coordinate reference system </h4>
                <BaseInformation data={data}/>
                <div className="about__advance" key='advance'>
                    <h4 className="about__block-title">Advance:</h4>
                    <Elipsoid data={data}/>
                    <CoordinateSystem data={data}/>
                    <Datum data={data}/>
                </div>
            </div>
    )
}