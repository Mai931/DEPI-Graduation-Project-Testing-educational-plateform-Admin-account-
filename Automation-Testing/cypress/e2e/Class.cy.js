require('cypress-xpath');
import 'cypress-real-events/support';

describe('ITC College Admin Dashboard - Class Page Test Cases', () => {

  // Login function
  beforeEach(() => {
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('[name="email"]').type('Admaane@gmail.com');
    cy.get('[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.visit('https://edu.itc-college.com/class'); // Navigating to the class page
  });

  // 1. Validate Class Creation Functionality
  it('Validate Class Creation Functionality', () => {
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-3 > div > div > form > div > div.add-visitor > div:nth-child(1) > div > div > input.primary_input_field.form-control').type('New Class');
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-3 > div > div > form > div > div.add-visitor > div:nth-child(2) > div > div > input').type('pass mark');
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-3 > div > div > form > div > div.add-visitor > div:nth-child(3) > div > div:nth-child(2) > label').click();
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click();
  });

  // 2. Validate Class Deletion Functionality
  it('Validate Class Deletion Functionality', () => {
    cy.get('#dropdownMenu2').first().click({force: true}); // Assuming dropdown appears with class options
    // cy.get('#table_id > tbody > tr:nth-child(1) > td:nth-child(5) > div > div').should('be.visible')
    cy.get('#table_id > tbody > tr:nth-child(1) > td:nth-child(5) > div > div > a:nth-child(2)').last().click({force: true}); // Click delete option
    cy.get('#table_id > tbody > tr:nth-child(3) > td:nth-child(5) > div > div > a:nth-child(2)').click({force: true}); // Confirm delete

  });

  // 3. Validate Class Modification Functionality
  it('Validate Class Modification Functionality', () => {
    cy.get('#dropdownMenu2').first().click({force: true}); // Assuming dropdown appears with class options
    cy.get('#table_id > tbody > tr:nth-child(1) > td:nth-child(5) > div > div > a:nth-child(1)').first().click({force: true}); // Click edit option
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div:nth-child(2) > div.col-lg-3 > div > div > form > div > div.add-visitor > div:nth-child(1) > div > div > input.primary_input_field.form-control').clear().type('Updated Class Name'); // Edit class name
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div:nth-child(2) > div.col-lg-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click({force: true});
  });

  // 4. Validate Numeric Input for "Pass Mark" Field
  it('Validate Numeric Input for "Pass Mark" Field', () => {
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-3 > div > div > form > div > div.add-visitor > div:nth-child(2) > div > div > input').type('90');
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click();
    // Try adding invalid input
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-3 > div > div > form > div > div.add-visitor > div:nth-child(2) > div > div > input').clear().type('invalidText');
    cy.get('#error-message').should('contain', 'Invalid input for Pass Mark');
  });


});
