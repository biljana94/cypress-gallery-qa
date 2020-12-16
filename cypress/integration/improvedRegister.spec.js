/// <reference types="Cypress"/>

const Locators = require('../fixtures/Locators.json')
const faker = require('faker');

let userData = {
    randomFirstName: faker.name.firstName(),
    randomLastName: faker.name.lastName(),
    randomEmail: faker.internet.email(),
    randomPassword: faker.internet.password()
}

describe('Register test', () => {
    //ne unistava sesiju i samo jednom se izvrsava pre svih testova
    before('Visit Gallery Page', () => {
        cy.visit('/')
    })

    it('Register', () => {
        cy.get(Locators.Header.Register).click()
        cy.get(Locators.Register.FirstName).type(userData.randomFirstName)
        cy.get(Locators.Register.LastName).type(userData.randomLastName)
        cy.get(Locators.Register.Email).type(userData.randomEmail)
        cy.get(Locators.Register.Password).type(userData.randomPassword + '1')
        cy.get(Locators.Register.ConfirmPassword).type(userData.randomPassword + '1')
        cy.get(Locators.Register.AcceptTerms).check()
        cy.get(Locators.Register.Submit).click()
        cy.get('.title-style').should('be.visible').and('have.text', 'All Galleries') //getovala sam title sa home page aplikacije i proverila da li cypress to vidi posle registracije
    })
})