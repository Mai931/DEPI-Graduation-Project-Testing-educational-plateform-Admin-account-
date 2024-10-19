require('cypress-xpath');
import 'cypress-real-events/support';

describe('Lesson Plan Topic Page Functionality', () => {

  // Login and navigate to the Lesson Plan Topic page before each test
  beforeEach(() => {
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('[name="email"]').type('Admaane@gmail.com');
    cy.get('[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.visit('https://edu.itc-college.com/lesson/topic'); // Replace with your actual topic page URL
  });

  // TC-329: Verify "Add Topic" form functionality
  it('SCRUM-TC-329: Verify "Add Topic" form functionality', () => {
    cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div[1]/div[1]/div/div/div[2]/div[1]/div/div').first().click(); // Open the "Add Topic" form
    cy.xpath('//*[@id="select_section_div"]/div[1]').first().click({force:true}); // Fill in the topic title
    cy.xpath('//*[@id="select_subject_div"]/div[1]/span').first().click({force:true});
    cy.xpath('//*[@id="select_lesson_div"]/div[1]').first().click({force:true});
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > form > div > div.col-lg-4.col-xl-3 > div.row.mt-40 > div > div > div > div > button').click({force:true});
  });

  // TC-330: Verify mandatory fields in the "Add Topic" form
  it('SCRUM-TC-330: Verify mandatory fields in the "Add Topic" form', () => {
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > form > div > div.col-lg-4.col-xl-3 > div.row.mt-40 > div > div > div > div > button').click(); // Submit without filling the form
    cy.get('#main-content > section.admin-visitor-area.up_st_admin_visitor > div > form > div > div.col-lg-4.col-xl-3 > div:nth-child(1) > div > div > div.add-visitor > div:nth-child(1) > div > span').should('contain','field is required'); // Verify the error message for missing mandatory field
  });

});
