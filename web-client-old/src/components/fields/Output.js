import React from 'react';

function OutputCoordinateField({ className, point }) {
  return (
    <div className={`accordion__output-container ${className}-output`}>
      <p className={`accordion__output-field`}>{point.x}</p>
      <p className={`accordion__output-field`}>{point.y}</p>
      <p className={`accordion__output-field`}>{point.z}</p>
    </div>
  );
}
export default OutputCoordinateField;