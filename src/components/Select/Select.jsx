import React from 'react';
import './Select.scss';

const Select = ({ items, ...restProps}) => {
  return (
    <select className="select" {...restProps}>
      {items.map((item) => <option key={item.value} {...item}></option>)}
    </select>
  )
}

export default Select;