describe('App is successfully started', () => {
  it('App is succesfully started', () => {
    cy.visit('/')
    cy.get('#root').should('exist')
  })

  it('Events Page should open', () => {
    cy.visit('/events')
    cy.get('.layout__title').should('contain', 'Events Listing')
  })

  it('Should show no events placeholder', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:9001/events',
      response: []
    })

    cy.visit('/events')
    cy.get('.events-list__placeholder').should('contain', 'No events were found')
  })

  it('Should show error placeholder', () => {
    cy.server({
      status: 500,
      response: {}
    })

    cy
      .route('GET', 'http://localhost:9001/events', {
        name: 'ServerError',
        message: 'Something happened on server'
      })

    cy.visit('/events')
    cy.get('.events-list__placeholder').should('contain', 'Something went wrong')
  })

  it('Should render list of event', () => {
    cy.fixture('events.json').then(eventsData => {
      cy.server()
      cy.visit('/events', {
        onBeforeLoad: (win) => {
          cy
            .stub(win, 'fetch')
            .withArgs('http://localhost:9001/events')
            .resolves({
              ok: true,
              json: () => eventsData
            })
        }
      })
      cy.get('.events-list').find('.event').should('have.length', eventsData.length)
    })
  })

  it('Should render one event page', () => {
    cy.fixture('events.json').then(eventsData => {
      const event = eventsData[0]

      cy.visit('/events/1', {
        onBeforeLoad: (win) => {
          cy
            .stub(win, 'fetch')
            .withArgs('http://localhost:9001/events/1')
            .resolves({
              ok: true,
              json: () => event
            })
        }
      })
      cy.get('.event__title').should('contain', event.name)
      cy.get('.event__image').should('have.attr', 'src', event.image)
    })
  })
})
