import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { getEvents, parseDate } from 'api/events'
import Filter from 'components/Filter'
import Select from 'components/Select'
import Field from 'components/Field'
import EventsList from 'components/EventsList'
import Placeholder from 'components/Placeholder';
import Event from 'components/Event'
import * as Layout from 'components/Layout'

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
]

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
  }
]

const MonthsMap = {
  'January': 0,
  'February': 1,
  'March': 2,
  'April': 3,
  'May': 4,
  'June': 5,
  'July': 6,
  'August': 7,
  'September': 8,
  'October': 9,
  'November': 10,
  'December': 11,
}

const filtersMap = {
  city: city => item => item.city === city,
  month: month => item => item.date.getMonth() === MonthsMap[month]
}

const LOAD_STATE = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  ERROR: 'ERROR'
}

function List () {
  const [allEvents, setEvents] = useState([])
  const [filters, setFilters] = useState({
    city: 'all',
    month: 'all'
  })
  const [loadState, setLoadState] = useState(LOAD_STATE.IDLE)

  const onFilterChange = useCallback((event) => {
    const { target } = event
    setFilters((oldFilters) => ({
      ...oldFilters,
      ...{
        [target.name]: target.value
      }
    }))
  }, [setFilters])

  const events = useMemo(() => {
    const currentFilters = Object.entries(filters)
      .map(([filterKey, filterValue]) => filterValue === 'all'
        ? () => true
        : filtersMap[filterKey](filterValue)
      )

    return allEvents
      .map(eventItem => ({
        ...eventItem,
        date: parseDate(eventItem.date)
      }))
      .filter(eventItem => currentFilters.every(filter => filter(eventItem)))
  }, [allEvents, filters])

  useEffect(() => {
    setLoadState(LOAD_STATE.LOADING)
    getEvents()
      .then(setEvents)
      .then(() => setLoadState(LOAD_STATE.IDLE))
      .catch(() => setLoadState(LOAD_STATE.ERROR))
  }, [setLoadState])

  return (
    <Layout.Root>
      <Layout.Title>Events Listing</Layout.Title>
      <Layout.Filter>
        <Filter>
          <Field label="City" htmlFor="city-input">
            <Select id="city-input" name="city" value={filters.city} onChange={onFilterChange} items={citiesItems}/>
          </Field>
          <Field label="Month" htmlFor="month-input">
            <Select id="month-input" name="month" value={filters.month} onChange={onFilterChange} items={months}/>
          </Field>
        </Filter>
      </Layout.Filter>
      {loadState === LOAD_STATE.LOADING && (
        <Placeholder>Loading...</Placeholder>
      )}

      {loadState === LOAD_STATE.ERROR && (
        <Placeholder type="error">Something went wrong</Placeholder>
      )}

      {loadState === LOAD_STATE.IDLE && (
        events && events.length > 0
          ? (
            <EventsList>
              {events.map(event => <Event key={event.id} event={event} />)}
            </EventsList>
          )
          : <Placeholder>No events were found</Placeholder>
      )}
    </Layout.Root>
  )
}

export default List
