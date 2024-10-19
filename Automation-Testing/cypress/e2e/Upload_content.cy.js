require('cypress-xpath');
import 'cypress-real-events/support';

describe('Upload Content Page Functionality', () => {

  // Login and navigate to Upload Content page before each test
  beforeEach(() => {
    cy.visit('https://edu.itc-college.com//admin-dashboard'); // Replace with your website's login page
    cy.get('[name="email"]').type('Admaane@gmail.com');
    cy.get('[name="password"]').type('123456');
    cy.get('button[type="submit"]').click(); 
    cy.visit('https://edu.itc-college.com/upload-content'); // Navigate to Upload Content page
  });

  // TC-297: Verify content upload functionality
  it('TC-297: Verify content upload functionality', () => {
    cy.get('#main-content > section.admin-visitor-area.up_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mb-25 > div:nth-child(1) > div > input').type('upload new content'); 
    cy.get('#main-content > section.admin-visitor-area.up_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mb-25 > div:nth-child(2) > div > span').first().click();
    cy.get('#main-content > section.admin-visitor-area.up_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mb-25 > div:nth-child(3) > div:nth-child(3) > label').click({force:true}); 
    cy.get('#main-content > section.admin-visitor-area.up_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click({force:true}); // Submit the upload
  });

  // TC-301: Verify content upload fails for missing required fields
  it('TC-301: Verify content upload fails for missing required fields', () => {
    cy.get('#main-content > section.admin-visitor-area.up_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mt-40 > div > button').click(); // Submit without selecting a file
    cy.get('#main-content > section.admin-visitor-area.up_admin_visitor > div > div > div.col-lg-4.col-xl-3 > div > div > form > div > div.add-visitor > div.row.mb-25 > div:nth-child(1) > div > span').should('contain','field is required'); // Verify error message
  });

});
