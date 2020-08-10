import React from 'react'
import { Link } from 'react-router-dom'
import BookmarkButton from 'components/BookmarkButton'
import './style.scss'

function parseDate (date) {
  return new Date(...date.split('.').reverse())
}

const Event = ({ event }) => {
  return (
    <article className="event">
      <svg className="event__size-helper" viewBox="0 0 3 2"></svg>
      <img className="event__image" src={event.image} alt={event.name} />
      <div className="event__main">
        <h2 className="event__title">
          <Link className="event__link" to={`/events/${event.id}`}>{event.name}</Link>
        </h2>
        <div className="event__meta">
          <div className="event__day">{parseDate(event.date).getDate()}</div>
          <BookmarkButton name="bookmark" value={event.id} />
        </div>
      </div>
    </article>
  )
}

export default Event
