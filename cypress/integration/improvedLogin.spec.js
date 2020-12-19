/// <reference types="Cypress"/>

const faker = require('faker') //uvlacimo faker u test fajl
const locators = require('../fixtures/locators.json'); //uvlacimo lokatore u test fajl

//objekat koji nam predstavlja korisnika
let userData = {
    randomName: faker.name.findName(),
    randomEmail: faker.internet.email(),
    randomPassword: faker.internet.password()
}

describe("Improved tests", () => {

    //kad imamo beforeEach onda gubimo sesiju u svakom novom it() bloku
    beforeEach("Visit gallery app", () => {
        cy.visit("/")
        cy.url().should("contains", "https://gallery-app")
    })

    let correctEmail = 'test123123@test.com';
    let correctPassword = 'test123123';

    it("Login with valid credentials", () => {
        // cy.visit('/')
        cy.get(locators.header.loginButton).click()
        cy.get(locators.login.email).type('test123123@test.com')
        cy.get(locators.login.password).type('test123123')
        cy.get(locators.login.buttonSubmit).click()
    })

    it("Logout", () => {
        cy.get(locators.header.loginButton).click()
        cy.get(locators.login.email).type(correctEmail)
        cy.get(locators.login.password).type(correctPassword)
        cy.get(locators.login.buttonSubmit).click()
        // cy.contains('My Galleries').should('be.visible')
        cy.get(locators.header.logoutButton).click()
    })

    it('Login with faker invalid credentials', () => {
        cy.get(locators.header.loginButton).click()
        cy.get(locators.login.email).type(userData.randomEmail)
        cy.get(locators.login.password).type(userData.randomPassword)
        cy.get(locators.login.buttonSubmit).click()
    })
})