import { Fields } from './fields'
export function Output ({point}) {
  return ( <div className="output-fields">
        <div className="output-fields__header">
        </div>
        <div className="output-fields__container fields__container">
            <Fields name='output' point={point} origin='target' />
        </div>
      </div>
    )
}