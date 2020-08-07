import React from 'react';
import Root from 'components/Root/Root';
import Filter from 'components/Filter/Filter';
import Select from 'components/Select/Select';
import Field from 'components/Field/Field';
import EventsList from 'components/EventsList/EventsList';
import Event from 'components/Event/Event';
import * as EventsSection from 'modules/EventsSection/EventsSection';
import eventsData from 'events.json';

const citiesItems = [
  {
    value: 'all',
    label: 'All cities'
  },
  {
    value: 'Amsterdam',
    label: 'Amsterdam'
  },
  {
    value: 'Berlin',
    label: 'Berlin'
  },
  {
    value: 'Rim',
    label: 'Rim'
  },
  {
    value: 'Sr.Petersburg',
    label: 'Sr.Petersburg'
  },
  {
    value: 'Moscow',
    label: 'Moscow'
  }
];

const months = [
  {
    value: 'all',
    label: 'All months'
  },
  {
    value: 'January',
    label: 'January'
  },
  {
    value: 'February',
    label: 'February'
  },
  {
    value: 'March',
    label: 'March'
  },
  {
    value: 'April',
    label: 'April'
  },
  {
    value: 'May',
    label: 'May'
  },
  {
    value: 'June',
    label: 'June'
  },
  {
    value: 'July',
    label: 'July'
  },
  {
    value: 'August',
    label: 'August'
  },
  {
    value: 'September',
    label: 'September'
  },
  {
    value: 'October',
    label: 'October'
  },
  {
    value: 'November',
    label: 'November'
  },
  {
    value: 'December',
    label: 'December'
  },
];

function parseDate(date) {
  return new Date(...date.split('.').reverse());
}

export function createApp() {
  return function App() {
    return (
      <Root>
        <EventsSection.Root>
          <EventsSection.Title>Events Listing</EventsSection.Title>
          <EventsSection.Filter>
            <Filter>
              <Field label="City" htmlFor="city-input">
                <Select id="city-input" name="city" items={citiesItems}/>
              </Field>
              <Field label="Month" htmlFor="month-input">
                <Select id="month-input" name="month" items={months}/>
              </Field>
            </Filter>
          </EventsSection.Filter>
          <EventsList>
            {eventsData.map(event => {
              event.date = parseDate(event.date);
              return (
                <Event key={event.id} event={event} />
              )
            })}
          </EventsList>
        </EventsSection.Root>
      </Root>
    )
  }
}