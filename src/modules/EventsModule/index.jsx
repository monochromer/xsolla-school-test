import React from 'react'
import { Switch, Route } from 'react-router-dom'
import EventsList from './EventsList'
import SingleEvent from './SingleEvent'

function EventsModule ({ match }) {
  return (
    <Switch>
      <Route path={match.url} component={EventsList} exact />
      <Route path={`${match.url}/:id`} component={(props) => <SingleEvent {...props} parentUrl={match.url} />} />
    </Switch>
  )
}

export default EventsModule
