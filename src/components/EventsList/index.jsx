import React, { Children, cloneElement } from 'react'
import './style.scss'

const EventsList = (props) => {
  const content = Children.map(props.children, item => cloneElement(item, {
    className: 'events-list__item'
  }))

  return (
    <ul className="events-list">{content}</ul>
  )
}

export default EventsList
