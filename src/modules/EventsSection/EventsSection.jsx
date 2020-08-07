import React, { createElement, Children, cloneElement } from 'react';
import './EventsSection.scss';

const Root = (props) => {
  return (
    <div className="events-section">{props.children}</div>
  )
}

const Title = ({ children, level = 1}) => {
  return createElement(`h${level}`, {
    className: 'events-section__title',
    children: children
  });
}

const Filter = (props) => {
  const child = Children.only(props.children);
  return cloneElement(child, { className: 'events-section__filter' });
}

export {
  Root,
  Title,
  Filter
}