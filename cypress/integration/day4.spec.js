/// <reference types="Cypress"/>

// const { identity } = require('cypress/types/lodash');
const faker = require('faker') //uvlacimo faker u test fajl
const locators = require('../fixtures/locators.json'); //uvlacimo lokatore u test fajl

var token = '' //prazna varijabla token u koju stavljamo token kad ga izvucemo iz localStorage-a

let userData = {
    email: 'test123123@test.com',
    password: 'test123123',
    randomTitle: faker.name.title(),
    randomDescription: faker.lorem.sentence(),
    randomImage: [`${faker.image.avatar()}`] //ovo ce nam se proslediti kao string u it() bloku
}

describe('Example - day 4', () => {
    before('Visit gallery app', () => {
        cy.visit('/')
        cy.url().should("contain", 'https://gallery-app')
    })

    // ulogujemo se i sacuvamo token u localStorage, i sad cemo biti ulogovani i u sledecem IT() bloku
    it('Request example', () => {
        cy.request({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login',
            body: {
                email: userData.email,
                password: userData.password
            }
        }).its('body').then((response) => {
            window.localStorage.setItem('token', response.access_token)
            token = response.access_token //token koji smo izvukli iz localStorage-a stavljamo u var token posto on ima scope do svih it() blokova
        })
        cy.visit('/login')
    })

    it('Create new gallery through backend', () => {
        cy.request({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries',
            body: {
                title: userData.randomTitle,
                description: userData.randomDescription,
                images: userData.randomImage
            },
            //moramo da prosledimo token koji smo smestili gore u varijablu token
            //token se nalazi u Request Headers-u i moramo i token da smestimo tu kad ga saljemo
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    })
})