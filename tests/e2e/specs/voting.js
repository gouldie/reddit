describe('voting on posts functions correctly', () => {
  beforeEach(() => {
    cy.viewport(1264, 1000)
    cy.visit('/')

    cy.server()
    cy.route({
      method: 'GET',
      url: '/api/posts?sort=Best',
      response: 'fixture:posts.json'
    })
    cy.route({
      method: 'POST',
      url: '/api/posts/*',
      response: {
        success: true
      }
    })

    const username = String(Cypress.env('username'))
    const password = String(Cypress.env('password'))

    cy.get('header').find('.log-in-button').click()

    cy.get('input[name=username]').type(username)
    cy.get('input[name=password]').type(`${password}{enter}`)

    cy.get('[data-testid=create-post-container]').should('be.visible')

    cy.getCookie('token').should('exist')
  })

  it('vote count adjusts accordingly', () => {
    cy.get('.vote-panel').first().find('[data-testid=vote-count]').invoke('text').then(($before) => {
      cy.get('.vote-panel').first().find('[data-testid=upvote-button]').click()

      cy.get('.vote-panel').first().find('[data-testid=vote-count]').should('have.text', String(Number($before) + 1))
      cy.get('.vote-panel').first().find('[data-testid=upvote-button]').should('have.class', 'green--text')

      cy.get('.vote-panel').first().find('[data-testid=downvote-button]').click()

      cy.get('.vote-panel').first().find('[data-testid=vote-count]').should('have.text', String(Number($before) - 1))
      cy.get('.vote-panel').first().find('[data-testid=downvote-button]').should('have.class', 'red--text')

      cy.get('.vote-panel').first().find('[data-testid=upvote-button]').click() // set back to +1
    })
  })
})
