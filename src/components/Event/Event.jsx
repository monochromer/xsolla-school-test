import React from 'react';
import BookmarkButton from 'components/BookmarkButton/BookmarkButton';
import './Event.scss';

const Event = ({ event }) => {
  return (
    <article className="event">
      <svg className="event__size-helper" viewBox="0 0 3 2"></svg>
      <img className="event__image" src={event.image} alt={event.name} />
      <div className="event__main">
        <h2 className="event__title">{event.name}</h2>
        <div className="event__meta">
          <div className="event__day">{event.date.getDate()}</div>
          <BookmarkButton name="bookmark" value={event.id} />
        </div>
      </div>
    </article>
  )
};

export default Event;