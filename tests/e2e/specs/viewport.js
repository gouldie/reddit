describe('page display on large size screen', () => {
  beforeEach(() => {
    cy.viewport(1264, 1000)
    cy.visit('/')
    cy.server()
    cy.route({
      method: 'GET', // Route all GET requests
      url: '/api/posts?sort=Best', // that have a URL that matches '/users/*'
      response: 'fixture:posts.json' // and force the response to be: []
    })
  })

  it('does display log in and sign up buttons', () => {
    cy.get('header').find('.log-in-button').should('be.visible')
    cy.get('header').find('.sign-up-button').should('be.visible')
  })

  it('does display multi column layout', () => {
    cy.get('.row').children().should('have.length', 2)
  })

  it('displays hamburger menu when logged in', () => {
    const username = String(Cypress.env('username'))
    const password = String(Cypress.env('password'))

    cy.request('POST', '/api/users/login', {
      username,
      password
    })

    cy.getCookie('token').should('exist')

    cy.visit('/')

    cy.get('[data-testid=hamburger-menu]').should('be.visible')
  })
})

describe('page display on xs size screen', () => {
  beforeEach(() => {
    cy.viewport(350, 1000)
    cy.visit('/')
    cy.server()
    cy.route({
      method: 'GET', // Route all GET requests
      url: '/api/posts?sort=Best', // that have a URL that matches '/users/*'
      response: 'fixture:posts.json' // and force the response to be: []
    })
  })

  it('does display hamburger menu', () => {
    cy.get('[data-testid=hamburger-menu]').should('be.visible')
  })

  it('does display single column layout', () => {
    cy.get('.row').children().should('have.length', 1)
  })
})
