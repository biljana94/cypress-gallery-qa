/// <reference types="Cypress"/>

// const { identity } = require('cypress/types/lodash');
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

        // POZIVAMO KOMANDU - komanda broj 1
        // cy.loginCommand('test123123@test.com', 'test123123')

        //POZIVAMO KOMANDU - komanda broj 2
        //ne prima nikakve parametre tako da joj ovde ne prosledjujemo nista
        // cy.loginCommandEnv()
        
        //LOGIN KROZ BACKEND
        // cy.request('POST', 'https://gallery-api.vivifyideas.com/api/auth/login', {
        //     email: 'test123123@test.com',
        //     password: 'test123123'
        // }).its('body').then((responseBody) => {
        //     window.localStorage.setItem('token', responseBody.access_token)
        // })
    })

    // INTERCEPT() funckija - nova funkcija u cypressu
    it.only('intercept request', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/login', (req) => {
            
        }).as('successfulLogin')
        cy.visit('/login')
        cy.get(locators.login.email).type('test123123@test.com')
        cy.get(locators.login.password).type('test123123')
        cy.get(locators.login.buttonSubmit).click()
        cy.wait('@successfulLogin').then((interception) => {
            // console.log(interception)
            expect(interception.response.body.user_id).to.equal(100)
        })
    })

    //LOGIN KROZ BACKEND
    it('Login through backend', () => {
        cy.visit('/login')
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