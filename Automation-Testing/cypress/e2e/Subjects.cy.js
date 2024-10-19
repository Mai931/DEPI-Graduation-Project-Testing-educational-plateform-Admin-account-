require('cypress-xpath');
import 'cypress-real-events/support';

describe('ITC College Admin Dashboard - Subject Page Test Cases', () => {

  // Login function
  beforeEach(() => {
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('[name="email"]').type('Admaane@gmail.com');
    cy.get('[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.visit('https://edu.itc-college.com/subject'); // Navigating to the subject page
  });

  // 1. Validate That Subject Creation is Successful
  it('Validate That Subject Creation is Successful', () => {
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div:nth-child(1) > div > div > input.primary_input_field.form-control').type('New Subject');
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div:nth-child(3) > div > div > input').type('Code')
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div:nth-child(4) > div > div > input').type('pass mark')
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click({force:true});
  });

  // 2. Validate that Subjects can be Filtered Using the Search Functionality
  it('Validate that Subjects can be Filtered Using the Search Functionality', () => {
    cy.get('#table_id_filter > label > input[type=search]').type('ta');
    cy.get('#table_id > tbody > tr > td:nth-child(2)').should('contain', 'ta'); // Check if the subject list contains the search result
  });

  // 3. Verify that an Error Message is Displayed When Mandatory Fields are Left Empty
  it('Verify that an Error Message is Displayed When Mandatory Fields are Left Empty', () => {
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click({force:true}); // Click the create button without entering required fields
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div:nth-child(1) > div > div > span').should('contain', 'The subject name field is required'); // Validate error message for empty field
  });


});
