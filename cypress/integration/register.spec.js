describe('Register tests', () => {
    it('Register with valid credentials', () => {
        cy.visit('/register')
        cy.get('#first-name').type('Biljana')
        cy.get('#last-name').type('Biljka')
        cy.get('#email').type('biljka666@example.com')
        cy.get('#password').type('test1234')
        cy.get('#password-confirmation').type('test1234')
        cy.get('input[type="checkbox"]').click()
        cy.get('button').click()
    })
})