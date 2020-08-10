import React from 'react';
import './style.scss';

const VisuallyHidden = ({ as = 'span', children }) => {
  const Tag = as;
  return (
    <Tag className="visually-hidden">{ children }</Tag>
  )
}

export default VisuallyHidden;