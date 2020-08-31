const API_HOST = process.env.API_HOST || 'http://localhost:9001'

/**
 * AJAX request
 * @param {string} url - url for request
 * @param {Object} [options] - options of request
 */
function request (url, options) {
  return fetch(`${API_HOST}${url}`, options)
    .then(response => {
      if (!response.ok) throw response
      return response
    })
    .then(response => response.json())
}

export function getEvents () {
  return request('/events')
}

export function getEventById (id) {
  return request(`/events/${id}`)
}

export function parseDate (date) {
  return new Date(...date.split('.').reverse())
}
