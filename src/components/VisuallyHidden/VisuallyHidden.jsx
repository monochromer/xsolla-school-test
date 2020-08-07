import React from 'react';
import './VisuallyHidden.scss';

const VisuallyHidden = ({ as = 'span', children }) => {
  const Tag = as;
  return (
    <Tag className="visually-hidden">{ children }</Tag>
  )
}

export default VisuallyHidden;