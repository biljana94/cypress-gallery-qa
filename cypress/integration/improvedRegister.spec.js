/// <reference types="Cypress"/>

const locators = require('../fixtures/locators.json')
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
        cy.get(locators.header.registerButton).click()
        cy.get(locators.register.firstName).type(userData.randomFirstName)
        cy.get(locators.register.lastName).type(userData.randomLastName)
        cy.get(locators.register.email).type(userData.randomEmail)
        cy.get(locators.register.password).type(userData.randomPassword + '1')
        cy.get(locators.register.confirmPassword).type(userData.randomPassword + '1')
        cy.get(locators.register.acceptTerms).check()
        cy.get(locators.register.submit).click()
        cy.get(locators.allGalleries.pageTitle).should('be.visible').and('have.text', 'All Galleries') //getovala sam title sa home page aplikacije i proverila da li cypress to vidi posle registracije
    })
})