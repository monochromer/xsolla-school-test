import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { getEvents, parseDate } from 'api/events'
import Filter from 'components/Filter'
import Select from 'components/Select'
import Field from 'components/Field'
import EventsList, { Placeholder as EventsListPlaceholder } from 'components/EventsList'
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

function List () {
  const [allEvents, setEvents] = useState([])
  const [filters, setFilters] = useState({
    city: 'all',
    month: 'all'
  })

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
    getEvents().then(setEvents)
  }, [])

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
      <EventsList>
        {allEvents.length === 0
          ? <EventsListPlaceholder>Loading...</EventsListPlaceholder>
          : (
            events && events.length > 0
              ? events.map(event => <Event key={event.id} event={event} />)
              : <EventsListPlaceholder>No events were found</EventsListPlaceholder>
          )
        }
      </EventsList>
    </Layout.Root>
  )
}

export default List
