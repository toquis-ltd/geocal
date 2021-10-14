import { useSelector } from 'react-redux'
import { Fields } from './fields'
import { convertToDMS } from 'calculation/format'
export function Output ({point}) {

  const DMS = useSelector(Root => Root.settings.DMS)
  const points = (DMS && point.x !== undefined && point.y !== undefined) ? {x:convertToDMS(point.x), y:convertToDMS(point.y), z:point.z} : point
  
  return ( <div className="output-fields">
        <div className="output-fields__header">
        </div>
        <div className="output-fields__container fields__container">
            <Fields name='output' point={points} origin='target' />
        </div>
      </div>
    )
}