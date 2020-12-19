/// <reference types="Cypress"/>

const faker = require('faker');
const locators = require('../fixtures/locators.json');

let userData = {
    randomTitle: faker.name.title(),
    randomDescription: faker.lorem.sentences(),
    randomImage: faker.image.avatar(), //jedino avatar upisuje imageURL u '*.jpg' formatu
    // randomImage2: faker.image.imageUrl()
};

describe('Create Gallery', () => {
    let correctEmail = 'test123123@test.com';
    let correctPassword = 'test123123';

    // ne unistava sesiju, i samo jednom se izvrsava pre svih it() blokova
    before('Login user', () => {
        cy.visit('/');
        cy.url().should('contain', 'https://gallery-app'); //asertacija
        cy.get(locators.header.loginButton).click();
        cy.get(locators.login.email).type(correctEmail);
        cy.get(locators.login.password).type(correctPassword);
        cy.get(locators.login.buttonSubmit).click();
    });

    it('Create Gallery Test', () => {
        // cy.visit('/');
        cy.get(locators.createGallery.createGalleryButton).click();
        cy.get(locators.createGallery.formTitle).should('contain.text', 'Create Gallery');
        cy.get(locators.createGallery.titleId).type(userData.randomTitle);
        cy.get(locators.createGallery.descriptionId).type(userData.randomDescription);
        cy.get(locators.createGallery.imageUrl).type(userData.randomImage)
        cy.get(locators.createGallery.buttonSubmit).eq(0).click();
        cy.get(locators.allGalleries.pageTitle).should('contain.text', 'All Galleries');
        cy.get(locators.allGalleries.galleryTitle).first().should('contain.text', userData.randomTitle);
    });
});