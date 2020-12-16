/// <reference types="Cypress"/>
import {authLogin} from '../page_objects/login_object';

//ovaj nacin se jako retko koristi
describe('POM login', () => {
    it('login using POM', () => {
        cy.visit('/')
        cy.get('.nav-link').eq(1).click()
        authLogin.login('test123123@test.com', 'test123123')
    })
})