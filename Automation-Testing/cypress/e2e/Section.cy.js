require('cypress-xpath');
import 'cypress-real-events/support';

describe('ITC College Admin Dashboard - Section Page Test Cases', () => {

  // Login function
  beforeEach(() => {
    cy.visit('https://edu.itc-college.com/admin-dashboard'); 
    cy.get('[name="email"]').type('Admaane@gmail.com');
    cy.get('[name="password"]').type('123456');
    cy.get('button[type="submit"]').click(); 
    cy.visit('https://edu.itc-college.com/section');
  });
  
  it('Verify admin can add new sections', () => {
    cy.xpath('//*[@id="levelText"]').type('New Section');
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click();
    // cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-8.col-xl-9 > div > div:nth-child(1) > div > div > h3').should('contain', 'New Section');
  });

  it('Validate that empty name field is not allowed while adding new section', () => {
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click();
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div:nth-child(1) > div > div > span').should('contain', 'Section name is required');
  });

  it('Verify that the entered name while adding new section is in valid form', () => {
    cy.get('body > div.preloader').type('Invalid Name!@#');
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click();
    cy.get('#toast-container > div > div.toast-message').should('contain', 'Invalid section name');
  });

  it('Verify the ability to delete a section', () => {
    // Click to open the dropdown menu first
     cy.get('#dropdownMenu2').first().click(); 

    // Wait for the dropdown items to be visible
       cy.get('.dropdown-item').should('be.visible'); 

    // cy.xpath('//*[@id="dropdownMenu2"]').last().click();
    cy.get('#table_id > tbody > tr:nth-child(1) > td:nth-child(2) > div > div > a:nth-child(2)').last().click();
    cy.get('#deleteSectionModal7 > div > div > div.modal-body > div.mt-40.d-flex.justify-content-between > a > button').click({force: true});
    cy.get('#table_id > tbody > tr > td').should('not.contain', 'Section to Delete');
  });

  it('Verify the ability to edit any section', () => {
    cy.get('#dropdownMenu2', { timeout: 10000 }).first().click();
    // Wait for the dropdown items to be visible
    cy.get('.dropdown-item').should('be.visible');
    cy.get('#table_id > tbody > tr:nth-child(3) > td:nth-child(2) > div > div > a:nth-child(1)').first().click({force: true});
    cy.get('#levelText').clear().type('Updated Section');
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div:nth-child(2) > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click();
  });

});
