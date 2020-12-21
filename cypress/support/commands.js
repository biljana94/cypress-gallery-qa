// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// KOMANDA ZA LOGIN
// KOMANDA BROJ 1
Cypress.Commands.add('loginCommand', (username, pass) => {
    cy.request({
        method: 'POST',
        url: 'https://gallery-api.vivifyideas.com/api/auth/login',
        body: {
            email: username,
            password: pass
        }
    }).its('body').then((responseBody) => {
        window.localStorage.setItem('token', responseBody.access_token)
    })
})

// DEFINISANJE VARIJABLE U ENVIRONMENTU (u cypress.json)
//KOMANDA BROJ 2
//definisali smo 2 environment varijable u CYPRESS.JSON koje ovde koristimo
//te 2 varijable koje smo definisali su prazne u cypress.json jer cemo ih setovati kroz terminal
Cypress.Commands.add('loginCommandEnv', () => {
    cy.request({
        method: 'POST',
        url: 'https://gallery-api.vivifyideas.com/api/auth/login',
        body: {
            email: Cypress.env('external_username'),
            password: Cypress.env('external_password')
        }
    }).its('body').then((responseBody) => {
        window.localStorage.setItem('token', responseBody.access_token) //setujemo token
    })
})