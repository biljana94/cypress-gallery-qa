/// <reference types="Cypress"/>

const faker = require('faker') //uvlacimo faker u test fajl
const Locators = require('../fixtures/Locators.json'); //uvlacimo lokatore u test fajl

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
        cy.get(Locators.Header.Login).click()
        cy.get(Locators.Login.Email).type('test123123@test.com')
        cy.get(Locators.Login.Password).type('test123123')
        cy.get(Locators.Login.ButtonSubmit).click()
    })

    it("Logout", () => {
        cy.get(Locators.Header.Login).click()
        cy.get(Locators.Login.Email).type(correctEmail)
        cy.get(Locators.Login.Password).type(correctPassword)
        cy.get(Locators.Login.ButtonSubmit).click()
        // cy.contains('My Galleries').should('be.visible')
        cy.get(Locators.Header.Logout).click()
    })

    it.only('Login with faker invalid credentials', () => {
        cy.get(Locators.Header.Login).click()
        cy.get(Locators.Login.Email).type(userData.randomEmail)
        cy.get(Locators.Login.Password).type(userData.randomPassword)
        cy.get(Locators.Login.ButtonSubmit).click()
    })
})