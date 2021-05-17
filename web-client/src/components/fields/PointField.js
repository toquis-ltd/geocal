import React, { useState } from 'react';
import { getPlaceholders } from '../../tools/calculate';
import { convertToDMS, convertToDecimal } from '../../tools/format';
import { InputField } from './Input';

const handleFormat = (point, state) => {

  const stateList = ["degrees", "d°m's"];
  const index = stateList.indexOf(state.get());

  Object.keys(point).forEach(element => {
    switch (index) {
      case 0:
        point[element] = convertToDecimal(point[element]);
        break;

      case 1:
        point[element] = convertToDMS(point[element]);
        break;

      default:
        break
    }
  });

  if (index < (stateList.length - 1)) return state.set(stateList[index + 1]);
  state.set(stateList[0]);
};

function PointField({ point, title, id, placeholder, onChange }) {
  const [format, setFormatIndex] = useState("d°m's");
  const placeholders = getPlaceholders(placeholder);
  return (
    <div className="input-fields">
      <div className="input-fields__header">
        <h3 className="field-title">{title}</h3>
      </div>
      <div className="input-fields__container">
        <InputField
          value={point.x}
          name={`${id}_x`}
          placeholder={placeholders[0]}
          onChange={(event) => onChange(event)} />

        <InputField
          value={point.y}
          name={`${id}_y`}
          placeholder={placeholders[1]}
          onChange={(event) => onChange(event)} />

        <InputField
          value={point.z}
          name={`${id}_z`}
          placeholder={placeholders[2]}
          onChange={(event) => onChange(event)} />
      </div>
      <div className='input-fields__footer'>
        {(placeholder === 'degree') ?
          <button 
            className='apply__button input-fields__format-btn'
            type='button'
            onClick={() => handleFormat(point, {get:() => format, set:setFormatIndex})}>
            Format: {format}
          </button> : null}
      </div>
    </div>
  );
}

export default PointField;