require('cypress-xpath');
import 'cypress-real-events/support';

beforeEach(() => {
    // Use session to store login state
    cy.session('userLogin', () => {
        cy.visit('https://edu.itc-college.com/login'); // Adjust login page URL
        cy.xpath('//input[@id="email-address"]').type('admaane@gmail.com'); // Adjust XPath for email
        cy.xpath('//input[@id="password"]').type('123456'); // Adjust XPath for password
        cy.xpath('//button[@type="submit"]').click(); // Adjust XPath for submit button
        cy.url().should('include', '/admin-dashboard'); // Verify redirection to admin dashboard
        cy.contains('Welcome - ITc College | Admin').should('be.visible'); // Verify welcome message
    });

    // Navigate to the marks grade page
    cy.visit('https://edu.itc-college.com/marks-grade');
});

describe('Marks Grade Page Functionality', () => {
    it('Verify that all grade descriptions and percentages are displayed correctly', () => {
        // Verify table data row by row
        const gradeData = [
            { grade: 'A', percent: '70-79.99%', description: 'Very Good !' },
            { grade: 'A-', percent: '60-69.99%', description: 'Good !' },
            { grade: 'B', percent: '50-59.99%', description: 'Outstanding !' },
            { grade: 'C', percent: '40-49.99%', description: 'Bad !' },
            { grade: 'D', percent: '33-39.99%', description: 'Very Bad !' },
            { grade: 'F', percent: '0-32.99%', description: 'Failed !' },
            { grade: 'A+', percent: '80-100%', description: 'outstanding !' }
        ];

        gradeData.forEach((data, index) => {
            cy.xpath(`//*[@id="table_id"]/tbody/tr[${index + 1}]/td[2]`).should('contain', data.grade);
            cy.xpath(`//*[@id="table_id"]/tbody/tr[${index + 1}]/td[3]`).should('contain', data.percent);
            cy.xpath(`//*[@id="table_id"]/tbody/tr[${index + 1}]/td[4]`).should('contain', data.description);
        });
    });

    it('Verify the "Save Grade" Button Functionality', () => {
        // Input grade information and save
        cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[1]/div/div/input[1]')
            .type('B+');
        cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[2]/div/div/input')
            .type('80');
        cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[3]/div/div/input[1]')
            .type('89.99');
        cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[4]/div/div/textarea')
            .type('Excellent!');
        cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[1]/div/div/form/div/div[2]/div[5]/div/button')
            .click();
    });

    describe('Verify "Select" Button Functionality for Editing a Grade', () => {
        it('should click the "Edit" button from the dropdown', () => {
            cy.xpath('//*[@id="dropdownMenu2"]').first().click(); // Open dropdown
            cy.xpath('//*[@id="table_id"]/tbody/tr[8]/td[5]/div/div/a[1]').click({ force: true }); // Click edit
        });
    });

    describe('Verify "Select" Button Functionality for Deleting a Grade', () => {
        it('should click the "Delete" button from the dropdown', () => {
            cy.xpath('//*[@id="dropdownMenu2"]').first().click(); // Open dropdown
            cy.xpath('//*[@id="table_id"]/tbody/tr[7]/td[5]/div/div/a[2]').click({ force: true }); // Click delete
            cy.on('window:confirm', () => true); // Confirm deletion
        });
    });

    it('Verify Search Functionality on the Marks Grade Page', () => {
        // Type "A" into the search input field
        cy.xpath('//*[@id="table_id_filter"]/label/input').type('A');

        // Wait for search results to load (optional)
        cy.wait(2000);

        // Find the rows in the table and filter the visible ones
        cy.xpath('//*[@id="table_id"]/tbody/tr').filter(':visible').should('have.length.above', 0);
    });



    it('Verify UI Elements on the Marks Grade Page Match the UI Design', () => {
        cy.xpath('//*[@id="main-content"]').should('contain', 'Marks Grade'); // Verify page header
        cy.xpath('//*[@id="table_id"]').should('be.visible'); // Verify table visibility
    });
});
