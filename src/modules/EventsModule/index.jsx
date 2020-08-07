import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EventsList from './EventsList';
import Event from './Event';

function EventsModule({ match }) {

  return (
    <Switch>
      <Route path={match.url} component={EventsList} exact />
      <Route path={`${match.url}/:id`} component={(props) => <Event {...props} parentUrl={match.url} />} />
    </Switch>
  )
}

export default EventsModule;