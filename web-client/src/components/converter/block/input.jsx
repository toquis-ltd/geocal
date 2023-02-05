import { Fields } from "./fields";

export function Input ({point, onChange}) {
    const handleChange = event => {
      onChange(prev => ({...prev, source:{...point, [event.target.name]:event.target.value}}));
    }
    return (
      <div className="input-fields">
        <div className="input-fields__header">
        </div>
        <div className="input-fields__container fields__container">
          <Fields name='input' point={point} origin={'source'} onChange={handleChange} />
        </div>
      </div>
    )
}