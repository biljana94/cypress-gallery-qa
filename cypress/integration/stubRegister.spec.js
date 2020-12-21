/// <reference types="Cypress"/>

//STABOVANJE
//vec smo kreirali ovog usera, tj registrovali smo se sa ovim podacima
//mozemo opet prividno da kreiramo tog usera
//mi sa fronta saljemo neke podatke, ALI sa backenda vracamo neki json koji smo vec definisali u svrhu testa

const faker = require('faker');
const locators = require('../fixtures/locators.json');

describe('Registration STUB', () => {
    it('Stub registration', () => {
        cy.visit('/register')
        cy.get(locators.register.firstName).type('test666')
        cy.get(locators.register.lastName).type('test666')
        cy.get(locators.register.email).type('test666@test.com')
        cy.get(locators.register.password).type('test1234')
        cy.get(locators.register.confirmPassword).type('test1234')
        cy.get(locators.register.acceptTerms).check()
        cy.get(locators.register.submit).click() //submitujemo nesto sto je vec u bazi
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/register', {fixture: 'stubUser.json'}) //ovo je stub
    })
})