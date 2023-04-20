import { getGreeting } from '../support/app.po';

describe('todo', () => {
  beforeEach(() => {
    cy.visit('/');
    // wait for the query to resolve to get list items
    cy.get('ul').should('have.length', 1);
  });

  it('should add a todo', () => {
    const testName = 'test todo';
    assertListEmpty();
    cy.get('form > input').type(testName).type('{enter}');
    // assert item added
    cy.get('label').contains(testName);
    // toggle item
    cy.get('input[type="checkbox"]').click();
    // assert item completed
    cy.get('input[type="checkbox"]').should('be.checked');
    // delete item
    cy.get('li > button').click();
    // assert list empty
    assertListEmpty();
  });
});

function assertListEmpty() {
  cy.get('li').should('have.length', 0);
}
