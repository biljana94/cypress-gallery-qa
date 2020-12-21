/// <reference types="Cypress"/>

const locators = require('../fixtures/locators.json');
const faker = require('faker');
// const { get } = require('cypress/types/lodash');

let userData = {
    randomTitle: faker.name.title(),
    randomDescription: faker.lorem.sentences(),
    randomImage: faker.image.avatar(), //jedino avatar upisuje imageURL u '*.jpg' formatu
    // randomImage2: faker.image.imageUrl()
};

describe('Delete Gallery', () => {
    let username = 'test123 test123';
    let correctEmail = 'test123123@test.com';
    let correctPassword = 'test123123';

    before('Login user and create gallery', () => {
        // login user
        cy.visit('/');
        cy.url().should('contain', 'https://gallery-app'); //asertacija
        cy.get(locators.header.loginButton).click();
        cy.get(locators.login.email).type(correctEmail);
        cy.get(locators.login.password).type(correctPassword);
        cy.get(locators.login.buttonSubmit).click();

        //create gallery
        cy.get(locators.createGallery.createGalleryButton).click();
        cy.get(locators.createGallery.formTitle).should('contain.text', 'Create Gallery');
        cy.get(locators.createGallery.titleId).type(userData.randomTitle);
        cy.get(locators.createGallery.descriptionId).type(userData.randomDescription);
        cy.get(locators.createGallery.imageUrl).type(userData.randomImage)
        cy.get(locators.createGallery.buttonSubmit).eq(0).click();
        cy.get(locators.allGalleries.pageTitle).should('contain.text', 'All Galleries');
        cy.get(locators.allGalleries.galleryTitle).first().should('contain.text', userData.randomTitle); //iz niza galleryTitle uzimamo first() title i proveravamo da li je isti kao title galerije koju smo kreirali
    });

    it('Delete Gallery Test', () => {
        cy.visit('/');
        cy.get(locators.allGalleries.galleryTitle).contains(userData.randomTitle).click();
        cy.get(locators.singleGallery.title).should('contain.text', userData.randomTitle);
        cy.get(locators.singleGallery.description).should('contain.text', userData.randomDescription);
        cy.get(locators.singleGallery.author).contains(username);
        cy.get(locators.singleGallery.deleteButton).click();
        cy.on('window:confirm', (text) => {
            expect(text).to.equal('Are you sure you want to delete gallery?');
            true;
        });
        // cy.get(locators.allGalleries.galleryTitle, (title) => {
        //     expect(title).to.not.equal(userData.randomTitle);
        // })
    });
});