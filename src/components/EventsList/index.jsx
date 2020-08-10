import React, { Children, cloneElement } from 'react';
import './style.scss';

const EventsList = (props) => {
  const items = props.children;
  const content = !items
    ? <Placeholder>Loading...</Placeholder>
    : Children.map(items, item => cloneElement(item, {
      className: 'events-list__item'
    }))

  return (
    <ul className="events-list">{content}</ul>
  )
};

const Placeholder = (props) => {
  return (
    <div className="events-list__placeholder">{props.children}</div>
  )
}

export default EventsList;
export { Placeholder };