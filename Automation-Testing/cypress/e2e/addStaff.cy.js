require('cypress-xpath');
import 'cypress-real-events/support';

describe('Add Staff Page Tests', () => {

    beforeEach(() => {
        // Use Cypress session to store login state for efficiency
        cy.session('userLogin', () => {
            cy.visit('https://edu.itc-college.com/login'); // Navigate to login page
            cy.xpath('//input[@id="email-address"]').type('admaane@gmail.com'); // Enter email
            cy.xpath('//input[@id="password"]').type('123456'); // Enter password
            cy.xpath('//button[@type="submit"]').click(); // Click login
            cy.url().should('include', '/admin-dashboard'); // Confirm successful login
            cy.contains('Welcome - ITc College | Admin').should('be.visible'); // Verify welcome message
        });

        // Navigate to the Add Staff page
        cy.visit('https://edu.itc-college.com/add-staff');
    });


    it('Verify "Add Staff" Form Fields', () => {
        // Verify visibility of form fields
        cy.xpath('//*[@id="basic_info"]/div/div/div/div/div/div/input').should('be.visible'); // Staff name input
        cy.xpath('//*[@id="basic_info"]/div/div/div/div/div/div/input').should('be.visible'); // Staff email input
        cy.xpath('//*[@id="basic_info"]/div/div/div/div/div/div/input').should('be.visible'); // Staff phone input
        cy.xpath('//*[@id="basic_info"]/div/div/div/div/div/div/div').should('be.visible'); // Staff role select
        cy.xpath('//*[@id="date_of_joining"]').should('be.visible'); // Staff joining date input

        // Fill the form with valid data
        cy.xpath('//*[@id="basic_info"]/div/div/div/div[2]/div[1]/div/input').type('radwa'); // Enter staff name
        cy.xpath('//*[@id="basic_info"]/div/div/div/div[3]/div[1]/div/input').type('john.doe@example.com'); // Enter staff email
        cy.xpath('//*[@id="basic_info"]/div/div/div/div[4]/div[1]/div/input').type('1234567890'); // Enter staff phone
        cy.xpath('//*[@id="basic_info"]/div/div/div/div[1]/div[2]/div/div').click(); // Open role dropdown
        cy.xpath('//*[@id="basic_info"]/div/div/div/div[1]/div[2]/div/div/ul/li[7]').click(); // Select 'Teacher' role
        cy.xpath('//*[@id="date_of_joining"]').type('2024-10-15'); // Enter joining date

        // Click Save button
        cy.xpath('//*[@id="main-content"]/section/form/div/div/div/div/ul/li/div/div/button').click();

        // Verify success message
        //cy.contains('operation success').should('be.visible');
    });

    it('Verify that all mandatory fields are validated properly', () => {
        // Try submitting form without filling mandatory fields
        cy.xpath('//*[@id="main-content"]/section/form/div/div/div/div/ul/li/div/div/button').click();

        // Verify error message for missing mandatory fields
        cy.xpath('//*[@id="basic_info"]/div/div/div/div/div/div/span').should('contain.text', 'The first name field is required');
    });



    it('Verify that the system prevents adding duplicate staff', () => {
        // Fill the form with duplicate staff data
        cy.xpath('//*[@id="basic_info"]/div/div/div/div[2]/div[1]/div/input').type('radwa'); // Enter staff name
        cy.xpath('//*[@id="basic_info"]/div/div/div/div[3]/div[1]/div/input').type('john.doe@example.com'); // Enter staff email
        cy.xpath('//*[@id="basic_info"]/div/div/div/div[4]/div[1]/div/input').type('1234567890'); // Enter staff phone
        cy.xpath('//*[@id="basic_info"]/div/div/div/div[1]/div[2]/div/div').click(); // Open role dropdown
        cy.xpath('//*[@id="basic_info"]/div/div/div/div[1]/div[2]/div/div/ul/li[7]').click(); // Select 'Teacher' role
        cy.xpath('//*[@id="date_of_joining"]').type('2024-10-15'); // Enter joining date

        // Click Save button
        cy.xpath('//*[@id="main-content"]/section/form/div/div/div/div/ul/li/div/div/button').click();

        // Verify error message for duplicate staff
        cy.contains('The email has already been taken').should('be.visible');
    });

});
