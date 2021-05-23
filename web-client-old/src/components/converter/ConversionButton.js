import {useState} from 'react';

export function ConversionButton() {
  const [isConverted, toggleConverted] = useState(false);
  return (
    <div className="buttons__container">
      <button
        className="apply__button convert-btn"
        type='submit'
        onClick={() => toggleConverted(!isConverted)}
      >
        {isConverted ? "Next" : "Convert"}
      </button>
    </div>
  );
}