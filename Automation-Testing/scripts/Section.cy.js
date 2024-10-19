require('cypress-xpath');
import 'cypress-real-events/support';
describe('ITC College Admin Dashboard - Section Page Test Cases', () => {

  // Login function
  before(() => {
    cy.visit('https://edu.itc-college.com/admin-dashboard'); // Navigate to the dashboard login page

    cy.get('[name="email"]').type('Admaane@gmail.com');  // Email input (Replace with the correct selector)
    cy.get('[name="password"]').type('123456');          // Password input (Replace with the correct selector)
    cy.get('button[type="submit"]').click();           // Login button (Replace with the correct selector)
  });

  beforeEach(() => {
    cy.visit('https://edu.itc-college.com/admin-dashboard/Section'); // Navigate to the Section page
  });

  it('Verify admin can add new sections', () => {
    cy.get('#levelText').type('New Section');
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click();
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-8.col-xl-9 > div > div:nth-child(1) > div > div > h3').should('contain', 'New Section');
  });

  // it('Validate that empty name field is not allowed while adding new section', () => {
  //   cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click();
  //   cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div:nth-child(1) > div > div > span').should('contain', 'Section name is required');
  // });

  // it('Verify that the entered name while adding new section is in valid form', () => {
  //   cy.get('body > div.preloader').type('Invalid Name!@#');
  //   cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click();
  //   cy.get('#toast-container > div > div.toast-message').should('contain', 'Invalid section name');
  // });

  // it('Verify the ability to delete a section', () => {
  //   cy.get('[data-test="delete-section-btn"]').first().click();
  //   cy.get('[data-test="section-list"]').should('not.contain', 'Section to Delete');
  // });

  // it('Verify the ability to edit any section', () => {
  //   cy.get('[data-test="edit-section-btn"]').first().click();
  //   cy.get('[data-test="section-name-input"]').clear().type('Updated Section');
  //   cy.get('[data-test="save-btn"]').click();
  //   cy.get('[data-test="section-list"]').should('contain', 'Updated Section');
  // });

  // it('Verify that changes are saved successfully after editing a section', () => {
  //   cy.get('[data-test="edit-section-btn"]').first().click();
  //   cy.get('[data-test="section-name-input"]').clear().type('Edited Section');
  //   cy.get('[data-test="save-btn"]').click();
  //   cy.get('[data-test="success-message"]').should('contain', 'Section updated successfully');
  // });

  // it('Verify that the system provides feedback after updating a section', () => {
  //   cy.get('[data-test="edit-section-btn"]').first().click();
  //   cy.get('[data-test="section-name-input"]').clear().type('Feedback Section');
  //   cy.get('[data-test="save-btn"]').click();
  //   cy.get('[data-test="success-message"]').should('contain', 'Section updated successfully');
  // });

  // it('Verify that the updated information persists after page refresh or user logout/login', () => {
  //   cy.get('[data-test="edit-section-btn"]').first().click();
  //   cy.get('[data-test="section-name-input"]').clear().type('Persistent Section');
  //   cy.get('[data-test="save-btn"]').click();
  //   cy.reload();
  //   cy.get('[data-test="section-list"]').should('contain', 'Persistent Section');
  // });

  // it('Verify that only authorized users can update section details', () => {
  //   cy.loginAsNonAdmin(); // Custom command to log in as a non-admin user
  //   cy.get('[data-test="edit-section-btn"]').should('not.exist');
  // });

  // it('Verify that search works as expected', () => {
  //   cy.get('[data-test="search-input"]').type('Search Section');
  //   cy.get('[data-test="section-list"]').should('contain', 'Search Section');
  // });
});
