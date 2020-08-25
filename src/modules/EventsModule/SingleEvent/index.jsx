import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getEventById, parseDate } from 'api/events'
import EventView from 'components/Event'
import * as Layout from 'components/Layout'

const SingleEvent = ({ match, parentUrl }) => {
  const [eventData, setEventData] = useState()

  useEffect(() => {
    const id = parseInt(match.params.id)
    getEventById(id).then(event => setEventData({
      ...event,
      date: parseDate(event.date)
    }))
  }, [match.params.id])

  return (
    <Layout.Root>
      <Layout.Title>
        <Link to={parentUrl}>Back to Events</Link>
      </Layout.Title>
      {eventData
        ? <EventView event={eventData}/>
        : <Layout.Placeholder>Loading</Layout.Placeholder>
      }
    </Layout.Root>
  )
}

export default SingleEvent
