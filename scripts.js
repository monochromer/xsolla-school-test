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

class EventsStore {
  constructor(data) {
    this._data = data.map(item => ({
      ...item,
      date: this.parseDate(item.date)
    }));

    this._filters = {};
  }

  setFilter(name, value) {
    this._filters[name] = value;
  }

  unsetFilter(name) {
    delete this._filters[name];
  }

  get filtersMap() {
    return {
      'city': city => item => item.city === city,
      'month': month => item => item.date.getMonth() === MonthsMap[month]
    }
  }

  parseDate(date) {
    return new Date(...date.split('.').reverse());
  }

  getEvents() {
    const filters = Object.entries(this._filters)
      .map(([filterKey, filterValue]) => this.filtersMap[filterKey](filterValue));

    return filters.length > 0
      ? this._data.filter(item => filters.every(filter => filter(item)))
      : this._data
  }
}

const notFoundTemplate = `
  <li class="events-list__item events-list__placeholder">No events were found</li>
`;

function eventTemplate(event) {
  return `
  <article class="event">
    <svg class="event__size-helper" viewbox="0 0 3 2"></svg>
    <img class="event__image" src="${event.image}" alt="${event.name}">
    <div class="event__main">
      <h2 class="event__title">${event.name}</h2>
      <div class="event__meta">
        <div class=event__day">${event.date.getDate()}</div>
        <button class="event__bookmark bookmark-button" type="button" name="bookmark" value="${event.id}">
          <svg class="bookmark-button__icon" width="16" height="20" viewBox="0 0 16 20" aria-hidden="true" focusable="false">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-5-7 5V3a2 2 0 012-2h10a2 2 0 012 2v16z"/>
          </svg>
          <span class="bookmark-button__text visually-hidden">Add / Delete bookmark</span>
        </button>
      </div>
    </div>
  </article>
  `;
}

function listTemplate(items) {
  return items.map(item => `
    <li class="events-list__item">
      ${eventTemplate(item)}
    </li>
  `).join('')
}

const filter = document.querySelector('.events-section__filter');
const eventsList = document.querySelector('.events-list');

function renderEvents(events) {
  const html = events && events.length > 0
    ? listTemplate(events)
    : notFoundTemplate;

  eventsList.innerHTML = html;
}

fetch('events.json')
  .then(response => response.json())
  .then(data => {
    const store = new EventsStore(data);

    renderEvents(store.getEvents());

    filter.addEventListener('change', (event) => {
      const {name, value} = event.target;

      if (value === 'all') {
        store.unsetFilter(name);
      } else {
        store.setFilter(name, value);
      }

      renderEvents(store.getEvents());
    });
  })
  .catch(console.error)
