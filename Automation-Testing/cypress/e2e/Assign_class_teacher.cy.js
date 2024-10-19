require('cypress-xpath');
import 'cypress-real-events/support';

describe('ITC College Admin Dashboard - Assign Class Teacher Test Cases', () => {

  // Login and navigate to Assign Class Teacher page before each test
  beforeEach(() => {
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('[name="email"]').type('Admaane@gmail.com');
    cy.get('[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.visit('https://edu.itc-college.com/assign-class-teacher'); // Navigating to Assign Class Teacher page
  });

  // 1. Verify that No Class is Assigned When No Input is Selected
  it('Verify that No Class is Assigned When No Input is Selected', () => {
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click(); // Click the assign button without selecting any input
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div:nth-child(1) > div > span').should('contain', 'field is required'); // Check for the error message indicating no input selected
  });

  // 2. Verify Successful Assignment of a Teacher to a Class
  it('Verify Successful Assignment of a Teacher to a Class', () => {
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div:nth-child(4) > div').first().click(); // Select a teacher from the dropdown
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div:nth-child(1) > div > div').first().click(); // Select a class from the dropdown
    cy.get('#select_section_div > div.nice-select.primary_select.form-control').first().click({force:true});
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click(); // Assign the teacher to the class
  });

});
