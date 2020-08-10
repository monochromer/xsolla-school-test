import React, { Children } from 'react';
import cn from 'classnames';
import './style.scss';

const Filter = (props) => {
  const childs = Children.map(
    props.children,
    (item) => <li className="filter__item">{item}</li>
  );

  return (
    <ul className={cn("filter", props.className)}>{childs}</ul>
  )
}

export default Filter;