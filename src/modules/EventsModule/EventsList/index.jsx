import React, { useState, useEffect } from 'react';
import { getEvents } from 'api/events';
import Filter from 'components/Filter/Filter';
import Select from 'components/Select/Select';
import Field from 'components/Field/Field';
import EventsList, { Placeholder as EventsListPlaceholder} from 'components/EventsList/EventsList';
import Event from 'components/Event/Event';
import * as EventsSection from 'modules/EventsModule/EventsSection/EventsSection';

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

function List() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then(data => {
        const parsedData = data.map(event => ({
          ...event,
          date: parseDate(event.date)
        }));
        setEvents(parsedData);
      })
  }, []);

  return (
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
        {events && events.length > 0
          ? events.map(event => <Event key={event.id} event={event} />)
          : <EventsListPlaceholder>Loading...</EventsListPlaceholder>
        }
      </EventsList>
    </EventsSection.Root>
  )
}

export default List;