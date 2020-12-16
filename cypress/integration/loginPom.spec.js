/// <reference types="Cypress"/>
import {authLogin} from '../page_objects/login_object';
import {header} from '../page_objects/header_object';

//ovaj nacin se jako retko koristi
describe('POM login', () => {
    it('login using POM', () => {
        cy.visit('/')
        // cy.get('.nav-link').eq(1).click() //losa praksa
        header.loginButton.click()
        authLogin.login('test123123@test.com', 'test123123')
    })

    it.only('logout using POM', () => {
        cy.visit('/')
        header.loginButton.click()
        authLogin.login('test123123@test.com', 'test123123')
        header.logout
    })
})