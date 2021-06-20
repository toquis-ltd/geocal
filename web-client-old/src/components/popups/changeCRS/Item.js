import React from 'react';

export const Item = (element, i, onClick) => {
  
  return (
    <div className='result__item' onClick={() => {onClick(element)}}  tabIndex="1" key={i}>
      <h3 className='result__item-title'>{element.name}</h3>
      <h4 className='result__item-description result__item-description--area'>Area: {element.area}</h4>
      <h4 className='result__item-description result__item-description--code'>EPSG Code: {element.code}</h4>
    </div>
  );
  }