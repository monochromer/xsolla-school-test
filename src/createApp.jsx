import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Root from 'components/Root';
import EventsModule from 'modules/EventsModule';

export function createApp() {
  return function App() {
    return (
      <Root>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/events"/>
            </Route>
            <Route path="/events" component={EventsModule} />
          </Switch>
        </Router>
      </Root>
    )
  }
}