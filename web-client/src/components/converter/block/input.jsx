import { Fields } from "./fields";
import { convertToDMS, convertToDecimal } from 'calculation/format'

export function Input ({point, onChange}) {
    const handleChange = event => {
      onChange(prev => ({...prev, source:{...point, [event.target.name]:event.target.value}}));
    }
    const handleFormat = event => {
      const tested = point.x ?? '0';
      console.log(point.x)
      if (tested.includes('°'))
      {
        onChange(prev => ({...prev, source:{...point, x:convertToDecimal(point.x), y:convertToDecimal(point.y)}}));
        return
      }
      onChange(prev => ({...prev, source:{...point, x:convertToDMS(point.x), y:convertToDMS(point.y)}}));
    }

    return (
      <div className="input-fields">
        <div className="fields__header input-fields__header">
          <button className="base__button point-converter__button input-fields__format-button" onClick={handleFormat}>Format</button>
        </div>
        <div className="input-fields__container fields__container">
          <Fields name='input' point={point} origin={'source'} onChange={handleChange} />
        </div>
      </div>
    )
}