/// <reference types="Cypress"/>
import {authLogin} from '../page_objects/login_object';

const faker = require('faker');
const locators = require('../fixtures/locators.json');

var galleryId = '' // varijabla koja je inicijalno prazna

let userData = {
    randomTitle: faker.name.title(),
    randomDescription: faker.lorem.sentence(),
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

    // it('Create Gallery Test', () => {
    //     // cy.visit('/');
    //     cy.get(locators.createGallery.createGalleryButton).click();
    //     cy.get(locators.createGallery.formTitle).should('contain.text', 'Create Gallery');
    //     cy.get(locators.createGallery.titleId).type(userData.randomTitle);
    //     cy.get(locators.createGallery.descriptionId).type(userData.randomDescription);
    //     cy.get(locators.createGallery.imageUrl).type(userData.randomImage)
    //     cy.get(locators.createGallery.buttonSubmit).eq(0).click();
    //     cy.get(locators.allGalleries.pageTitle).should('contain.text', 'All Galleries');
    //     cy.get(locators.allGalleries.galleryTitle).first().should('contain.text', userData.randomTitle);
    // });

    // Izvlacenje vrednosti GALLERY_ID iz responsa kad kreiramo galeriju
    it('Get galleryId when gallery was created', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/galleries', (req) => {

        }).as('successfulCreatedGallery')
        // cy.visit('/login')
        // authLogin.login('test123123@test.com', 'test123123') //koristimo POM za login
        cy.get(locators.createGallery.createGalleryButton).click()
        cy.get(locators.createGallery.titleId).type(userData.randomTitle)
        cy.get(locators.createGallery.descriptionId).type(userData.randomDescription)
        cy.get(locators.createGallery.imageUrl).type(userData.randomImage)
        cy.get(locators.createGallery.buttonSubmit).eq(0).click()
        cy.wait('@successfulCreatedGallery').then((interception) => {
            // console.log(interception)
            galleryId = interception.response.body.id
            // cy.log(galleryId)
        })
    })

    it('Delete Gallery', () => {
        cy.visit(`/galleries/${galleryId}`) //zapis koji nam omogucuje da u string upisemo varijablu
    })
});