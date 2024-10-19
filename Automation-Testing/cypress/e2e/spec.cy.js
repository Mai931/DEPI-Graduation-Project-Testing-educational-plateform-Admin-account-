require('cypress-xpath');
import 'cypress-real-events/support';

describe('Exam Type Functionality', () => {
  beforeEach(() => {
    // Use session to store login state
    cy.session('userLogin', () => {
      cy.visit('https://edu.itc-college.com/login'); // Visit login page
      cy.xpath('//input[@id="email-address"]').type('admaane@gmail.com'); // Email using XPath
      cy.xpath('//input[@id="password"]').type('123456'); // Password using XPath
      cy.xpath('//button[@type="submit"]').click(); // Click login using XPath
      cy.url().should('include', '/admin-dashboard'); // Verify successful login
      cy.contains('Welcome - ITc College | Admin').should('be.visible'); // Confirm login
    });

    cy.visit('https://edu.itc-college.com/exam-type'); // Visit exam-type page
  });

  describe('Verify Exam Type List Loads Correctly', () => {
    it('should load the exam type list', () => {
      // Ensure the exam type list is visible using XPath
      cy.xpath('//*[@id="table_id"]').should('be.visible'); // Replace with the actual XPath for the exam type list

      // Verify at least one exam type is loaded using XPath
      cy.xpath('//*[@id="table_id"]/tbody') // Replace with the actual XPath for exam type items
          .should('have.length.greaterThan', 0); // Ensure at least one exam type is present
    });
  });

  describe('Exam Type - Add New Exam', () => {
    it('should allow admin to add a new exam type', () => {
      // Enter a new exam name using XPath
      cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[1]/div/div/input[1]')
          .should('be.enabled') // Assert that the input is enabled
          .type('New Exam Type'); // Type the new exam name

      // Click on 'Yes' for passing examination by targeting the associated radio button (input element)
      cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[2]/div/div').click(); // Click the radio button for "Yes"

      // Enter the average mark after clicking "Yes"
      cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[3]/div/div/input')
          .should('be.enabled') // Assert that the input is enabled
          .type('70'); // Type the average mark

      // Click on "Save Exam Type" using XPath
      cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[4]/div/button').click();

      // Verify the new exam type is added to the list using XPath
      cy.xpath('//*[@id="table_id"]').should('contain', 'New Exam Type');
    });
  });

  describe('Edit an Existing Exam Type', () => {
    it('should allow admin to edit an existing exam type', () => {
      // Assuming you already have an exam type to edit, use its name or ID to select it
      cy.xpath('//*[@id="table_id"]/tbody/tr[2]/td[5]/div/div/a[1]').click({ force: true });
      // Click the exam type to edit

      // Edit the exam name
      cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[1]/div/div/input[1]')
          .clear().type('Updated Exam Type'); // Clear and type a new name

      // Click on "Save Exam Type"
      cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[4]/div/button').click();

      // Verify the exam type is updated
      cy.xpath('//*[@id="table_id"]').should('contain', 'Updated Exam Type');
    });
  });

  describe('Verify Admin Cannot Add Existing Exam', () => {
    it('should not allow admin to add an existing exam type', () => {
      // Try to add an existing exam type
      cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[1]/div/div/input[1]')
          .should('be.enabled') // Assert that the input is enabled
          .type('New Exam Type'); // Type the existing exam name

      // Click on "Save Exam Type"
      cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[4]/div/button').click();

      // Verify error message for existing exam type
      cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[1]/div/div/span').should('contain', 'The exam type title has already been taken'); // Replace with the actual error message ID or text
    });
  });

  describe('Verify Admin Cannot Add Exam with Empty Field', () => {
    it('should not allow admin to add an exam type with empty fields', () => {
      // Click on "Save Exam Type" without entering anything
      cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[4]/div/button').click();

      // Verify error message for empty fields
      cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[1]/div/div/span').should('contain', 'The exam type title field is required'); // Replace with the actual error message ID or text
    });
  });
});
