/// <reference types="Cypress"/>

// const { identity } = require('cypress/types/lodash');
const faker = require('faker') //uvlacimo faker u test fajl
const locators = require('../fixtures/locators.json'); //uvlacimo lokatore u test fajl

describe('Example 2', () => {
    before('Visit gallery app', () => {
        cy.visit('/')
    })

    //each() funkcija - kao forEach u javascriptu, prolazimo kroz niz i uzimamo svaki element niza
    it('forEach primer', () => {
        cy.get('.cell').each(($galleryCard, $index, $list) => {
            // console.log($galleryCard)
            //trim() fnc nam brise prazan prostor ako ga ima
            if($galleryCard.children().eq(0).text().trim() === 'District Brand Strategist') {
                expect($galleryCard.children(1).eq(1).children().text().trim()).to.equal('test123 test123')
                // console.log($galleryCard)
            }
        })
    })
})