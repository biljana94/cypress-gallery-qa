/// <reference types="Cypress"/>

const Locators = require('../fixtures/Locators.json'); //uvlacimo lokatore u test fajl

describe("Improved tests", () => {
    it("Login with valid credentials", () => {
        cy.visit('/')
        cy.get(Locators.Header.Login).click()
        cy.get(Locators.Login.Email).type('test123123@test.com')
        cy.get(Locators.Login.Password).type('test123123')
        cy.get(Locators.Login.ButtonSubmit).click()
    })
})