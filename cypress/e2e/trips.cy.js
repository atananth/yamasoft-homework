/// <reference types="cypress" />

import data from '../fixtures/trips.json'

describe('Trips Success', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4175/')
    cy.intercept('https://yamasoft.bg/trips.json', data).as('trips')
    cy.wait('@trips');
    cy.get('[data-cy="trip-grid-sort-button"]').click()
  })

  it('Displays X amount of images', () => {
    cy.get('.mui-image-img').should('have.length', 20)
  })

  it('Can filter for three canyon related trips', () => {
    cy.get('[data-cy="trip-grid-search-field"]').type('Canyon')
    cy.get('.mui-image-img').should('have.length', 3)
  })


  it('Can sort the three canyon related trips ascending and descending', () => {
    cy.get('[data-cy="trip-grid-search-field"]').type('Canyon')
    cy.get('[data-cy="trip-grid-sort-button"]').click()
    cy.get('[data-cy="trip-grid-sort-button"]').click()
    cy.get('[data-cy="trip-card-1"]').should('have.length', 1)
    cy.get('[data-cy="trip-card-7"]').should('have.length', 1)
    cy.get('[data-cy="trip-card-17"]').should('have.length', 1)
  })

  context('Trips Errors', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4175/')

      cy.intercept('https://yamasoft.bg/trips.json', { statusCode: 404 }).as('trips404')
      cy.wait('@trips404');
    })

    it('can get 404 error', () => {

      cy.get('[data-cy="trip-grid-error"]').should('have.length', 1)
      cy.contains('Error related to trip grid, check console for error')
    })
  })
})
