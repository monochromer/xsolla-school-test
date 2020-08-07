import React from 'react';
import './Field.scss';

const Field = ({ htmlFor, label, children }) => {
  return (
    <div className="field">
      <label className="field__label" htmlFor={htmlFor}>{label}</label>
      <div className="field__content">{children}</div>
    </div>
  )
}

export default Field;