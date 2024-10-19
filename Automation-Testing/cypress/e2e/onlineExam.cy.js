// cypress/e2e/onlineExam.cy.js

require('cypress-xpath');
import 'cypress-real-events/support';

describe('Online Exam Page Tests', () => {

    beforeEach(() => {
        // Use Cypress session to store login state for efficiency
        cy.session('userLogin', () => {
            cy.visit('https://edu.itc-college.com/login'); // Replace with actual login page URL
            cy.xpath('//input[@id="email-address"]').type('admaane@gmail.com'); // Enter email
            cy.xpath('//input[@id="password"]').type('123456'); // Enter password
            cy.xpath('//button[@type="submit"]').click(); // Click login button
            cy.url().should('include', '/admin-dashboard'); // Confirm successful login
            cy.contains('Welcome - ITc College | Admin').should('be.visible'); // Adjust based on the welcome message
        });

        // Navigate to the Online Exam page
        cy.visit('https://edu.itc-college.com/online-exam'); // Navigate to Online Exam page
    });

    it('Verify Online Exam List Display', () => {
        // Verify that the list of exams is displayed with required details in the header row using XPath
        cy.xpath('//*[@id="main-content"]//section//table').within(() => {
            // Capture the text content of each column header
            cy.xpath('//th').each(($el) => {
                const headerText = $el.text().trim();  // Trim to avoid extra spaces
                cy.log('Actual header:', headerText);  // Log the actual column header text for debugging

                const expectedColumns = [
                    'Title',
                    'Class (Section)',
                    'Subject',
                    'Exam Date',
                    'Duration',
                    'Minimum Percentage',
                    'Status',
                    'Action'
                ];

                // Log actual column headers for debugging
                cy.log(`Comparing actual header "${headerText}" with expected headers`);

                // Adjust assertion to ensure the headers match the expected columns
                expect(expectedColumns).to.include(headerText);  // Check if the actual header is in the expected list
            });
        });

        // Verify pagination by clicking the next page button using XPath
        cy.xpath('//*[@id="table_id_next"]/i').click({ force: true });

        // Wait for table content to load before making assertions (adjust time as needed)
        cy.wait(2000);

        // Verify that the table content has updated (You can use a more specific assertion)
        cy.xpath('//*[@id="main-content"]//section//table').within(() => {
            cy.get('tbody').should('not.be.empty');  // Check if the table's body has content
        });

        // Optionally, you can still check the URL if the website does modify it
        // cy.url().should('include', 'page=2');
    });





    it('Add a New Online Exam', () => {
        // Open the "Add Online Exam" form on the right panel
        cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[1]/div/div/input[1]').type('New Online Exam'); // Exam Title input

        // Handle dynamic dropdown for Class
        cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[2]/div/div').click(); // Click to open class dropdown
        cy.xpath('//ul[@class="dropdown-menu"] li').should('have.length.greaterThan', 0);  // Ensure there are items
        cy.xpath('//li[contains(text(), "GHR_SWD5_Mid")]').click(); // Select class option

        // Handle dynamic dropdown for Subject
        cy.xpath('//*[@id="subjectSelecttHomeworkDiv"]/div[1]').click(); // Click to open subject dropdown
        cy.xpath('//ul[@class="dropdown-menu"] li').should('have.length.greaterThan', 0);  // Ensure there are items
        cy.xpath('//li[contains(text(), "NET GHR_SWD5_Mid")]').click(); // Select subject

        // Set exam date and times
        cy.xpath('//*[@id="startDate"]').type('2024-10-15'); // Set exam date
        cy.xpath('//*[@id="start_time"]').type('10:00 AM'); // Set start time
        cy.xpath('//*[@id="end_time"]').type('12:00 PM'); // Set end time
        cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[9]/div/div/input[1]').type('70'); // Set minimum passing percentage

        // Submit the form
        cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[12]/div/button').click(); // Click the save button

        // Verify success message
        cy.contains('Online Exam added successfully').should('be.visible'); // Adjust based on the success message displayed on your app
    });

    it('Handle Missing Required Fields for Online Exam', () => {
        // Try submitting the form without filling in any required fields
        cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[12]/div/button').click(); // Click save button without filling the form

        // Verify error messages for missing required fields
        cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[1]/div/div/span').should('contain.text','The title field is required'); // Ensure error message is shown for required fields
    });

});
