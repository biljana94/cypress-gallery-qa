//u describe bloku mozemo imati vise testova
//u sto manjem broju testova testirati vise stvari
//mozemo imati vise it() blokova koji su nam testovi
//jedan it() blok - jedan test
describe('Login tests', () => {
    it('Go to page', () => {
        cy.visit('/')
    })
    it('Click on login', () => {
        cy.visit('/')
        cy.get('.nav-link').eq(1).click() //eq() - uzimamo odredjeni element iz niza (pisemo index tog elementa), posto ima vise elemenata sa ovom klasom
    })
    it('Login with valid credentials', () => {
        cy.visit('/')
        cy.get('a[href="/login"]').click()
        cy.get('#email').type('test123123@test.com')
        cy.get('#password').type('test123123')
        cy.get('button').click()
    })
    it('Logout', () => {
        cy.visit('/')
        cy.get('a[href="/login"]').click()
        cy.get('#email').type('test123123@test.com')
        cy.get('#password').type('test123123')
        cy.get('button').click()
        // cy.wait(500)
        // should() je ugradjena fnc u cypress, cekamo da se nesto pojavi pa onda se test nastavlja dalje - ASERTACIJA
        //have.length, 4 - cekamo da se niz ceo pojavi pa onda kliknemo na odredjeni element
        cy.get('.nav-link').should('have.length', 4).eq(3).click()
    })
})