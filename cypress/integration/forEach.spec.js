/// <reference types="Cypress"/>

// const { identity } = require('cypress/types/lodash');
const faker = require('faker') //uvlacimo faker u test fajl
const locators = require('../fixtures/locators.json'); //uvlacimo lokatore u test fajl

describe('Example 2', () => {
    // before('Visit gallery app', () => {
    //     cy.visit('/')
    // })

    //each() funkcija - kao forEach u javascriptu, prolazimo kroz niz i uzimamo svaki element niza
    it('forEach primer', () => {
        // '.cell' nam vraca niz galerija sa pocetne strane i prolazimo pomocu each() kroz taj niz i uzimamo svaki element niza
        //each($element, $index, $list) -> $element - el niza, $index - index tog elementa, $list - ceo niz kroz koji prolazimo
        cy.get('.cell').each(($galleryCard, $index, $list) => {
            // console.log($galleryCard)
            //trim() fnc nam brise prazan prostor ako ga ima
            if($galleryCard.children().eq(0).text().trim() === 'District Brand Strategist') {
                expect($galleryCard.children(1).eq(1).children().text().trim()).to.equal('test123 test123')
                // console.log($galleryCard)
            }
        })
    })

    //STABOVANJE
    //stabujemo dovlacenje 10 galerija (inicijalni dolazak na homepage)
    //u fixture su fixni podaci
    //intercept()
    //trigerovace se kad dodjemo na homepage, a definisali smo ga pre posete jer cemo poslati request pre posete
    //koliko galerija imamo definisanih u {fixture: 'stubGalleries.json'} toliko galerija se i prikazuje na pocetnoj strani
    //mozemo da testiramo user interface bez backenda; mozemo da testiramo sve sa stubom
    it.only('Primer sa stabovanim responsom', () => {
        cy.intercept('GET', 'https://gallery-api.vivifyideas.com/api/galleries?page=1&term=', {fixture: 'stubGalleries.json'})
        cy.visit('/')
        cy.wait(500)
    })
})