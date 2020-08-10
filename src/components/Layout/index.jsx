import React, { createElement, Children, cloneElement } from 'react';
import './style.scss';

const Root = (props) => {
  return (
    <div className="layout">{props.children}</div>
  )
}

const Title = ({ children, level = 1 }) => {
  return createElement(`h${level}`, {
    className: 'layout__title',
    children: children
  });
}

const Filter = (props) => {
  const child = Children.only(props.children);
  return cloneElement(child, { className: 'layout__filter' });
}

const Placeholder = (props) => {
  return (
    <div className="layout__placeholder">{props.children}</div>
  )
}

export {
  Root,
  Title,
  Filter,
  Placeholder
}