export function Output ({point}) {
    return (
      <div className="output-fields">
        <div className="output-fields__header">
        </div>
        <div className="output-fields__container fields__container">
            <input className='output-fields__item-field fields__item-field' value={point.x} autoComplete="off" readOnly={true} type='text'/>
            <input className='output-fields__item-field fields__item-field' value={point.y} autoComplete="off" readOnly={true} type='text'/>
            <input className='output-fields__item-field fields__item-field' value={point.z} autoComplete="off" readOnly={true} type='text'/>
        </div>
      </div>
    )
}