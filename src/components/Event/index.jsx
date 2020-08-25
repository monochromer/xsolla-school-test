import React from 'react'
import { Link } from 'react-router-dom'
import BookmarkButton from 'components/BookmarkButton'
import './style.scss'

/**
 * @typedef Event
 * @type {object}
 * @property {number} id - ID of event.
 * @property {string} image - url of event image.
 * @property {string} name - event name.
 * @property {Date} date - event date.
 */

const Event = ({ /** @type {Event} */event }) => {
  return (
    <article className="event">
      <svg className="event__size-helper" viewBox="0 0 3 2"></svg>
      <img className="event__image" src={event.image} alt={event.name} />
      <div className="event__main">
        <h2 className="event__title">
          <Link className="event__link" to={`/events/${event.id}`}>{event.name}</Link>
        </h2>
        <div className="event__meta">
          <div className="event__day">{event.date.getDate()}</div>
          <BookmarkButton name="bookmark" value={event.id} />
        </div>
      </div>
    </article>
  )
}

export default Event
