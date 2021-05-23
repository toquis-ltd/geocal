import React from 'react';

export function  InputField ({placeholder, value, onChange, name}) {
    return (
      <input
        autoComplete="off"
        placeholder={placeholder}
        type='text'
        value={value}
        name={name}
        className={`input-fields__item-field`}
        onChange={(event) => onChange(event)} />
    );
}

