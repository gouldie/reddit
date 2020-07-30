describe('auth flow', () => {
  beforeEach(() => {
    cy.viewport(1264, 1000)
    cy.visit('/')
  })

  it('logs in', () => {
    const username = String(Cypress.env('username'))
    const password = String(Cypress.env('password'))

    cy.get('header').find('.log-in-button').click()

    cy.get('input[name=username]').type(username)
    cy.get('input[name=password]').type(`${password}{enter}`)

    cy.get('[data-testid=create-post-container]').should('be.visible')

    cy.getCookie('token').should('exist')
  })
})
