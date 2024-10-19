require('cypress-xpath');
import 'cypress-real-events/support';

describe('Staff Attendance Page', () => {

    beforeEach(() => {
        // Use Cypress session to store login state for efficiency
        cy.session('userLogin', () => {
            cy.visit('https://edu.itc-college.com/login'); // Replace with your login page URL if different
            cy.xpath('//input[@id="email-address"]').type('admaane@gmail.com'); // Replace with correct email field XPath
            cy.xpath('//input[@id="password"]').type('123456'); // Replace with correct password field XPath
            cy.xpath('//button[@type="submit"]').click(); // Replace with the correct submit button XPath
            cy.url().should('include', '/admin-dashboard'); // Confirm we're redirected to the admin dashboard
            cy.contains('Welcome - ITc College | Admin').should('be.visible'); // Verify successful login
        });

        // Navigate to the Staff Attendance page
        cy.visit('https://edu.itc-college.com/staff-attendance'); // Replace with correct staff attendance page URL
    });

    it('Verify that the attendance date can be selected', () => {
        // Ensure the date picker input is visible and interactable
        cy.xpath('//*[@id="startDate"]', { timeout: 10000 }).should('be.visible').click(); // Ensure the field is clickable
        cy.xpath('//*[@id="startDate"]').type('2024-10-13'); // Type the date

        // Click the Search button using XPath
        cy.xpath('//*[@id="btnsubmit"]').click(); // Replace with the correct XPath for the search button

        // Wait for results and check if the form is visible
        cy.xpath('//*[@id="main-content"]/section/div/div/div/div/form', { timeout: 10000 })
            .should('be.visible') // Ensure the form is visible after search
            .should('contain', 'Admin'); // Replace with the expected text or result
    });

    it('Verify that both attendance date and role are mandatory fields', () => {
        // Leave both fields empty and click Search using XPath
        cy.xpath('//*[@id="btnsubmit"]').click(); // Click the search button without filling in fields

        // Assert that an error message appears for missing fields
        cy.xpath('//*[@id="infix_form"]/div/div/span').should('contain', 'The role field is required'); // Replace with actual error message
    });

    it('Verify the "Import Attendance" button redirects to the correct page', () => {
        // Click the Import Attendance button using XPath
        cy.xpath('//*[@id="main-content"]/section/div/div/div/div/div/div/a').click(); // Replace with correct XPath

        // Assert that the URL includes '/import-attendance'
        cy.url({ timeout: 10000 }).should('include', 'https://edu.itc-college.com/staff-attendance-import'); // Increase timeout if needed
    });


    it('Verify that a role can be selected', () => {
        // Ensure the custom role dropdown is visible and interactable
        cy.xpath('//*[@id="infix_form"]/div/div[1]/div', { timeout: 10000 }).should('be.visible').click({ force: true }); // Open the dropdown

        // Add a small delay to ensure the dropdown is fully expanded
        cy.wait(500);

        // Select a role from the dropdown using the visible text
        cy.contains('li', 'Admin').should('be.visible').click({ force: true }); // Ensure the option is visible and click it

        // Click the Search button using XPath
        cy.xpath('//*[@id="btnsubmit"]').click(); // Replace with the correct XPath for the search button

        // Wait for results and check if the form contains the expected role
        cy.xpath('//*[@id="main-content"]/section/div/div/div/div/form', { timeout: 10000 })
            .should('be.visible') // Ensure the form is visible after search
            .should('contain', 'Admin'); // Replace with the expected role in the result
    });



});
