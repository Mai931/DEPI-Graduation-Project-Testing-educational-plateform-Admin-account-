require('cypress-xpath');
import 'cypress-real-events/support';
describe('Change Password Functionality', () => {
  
  // Runs before each test to log in the user or set up any preconditions
  beforeEach(() => {
    cy.session('userLogin', () => {
      cy.visit('https://edu.itc-college.com/login'); // Change this to the URL of your login page
  
      cy.get('#email-address').type('admaane@gmail.com'); // Change to the correct input field and value
      cy.get('#password').type('123456'); // Change to the correct input field and value
     
      // Click on the login button
      cy.get('button[type="submit"]').click();
      
     
     // Verify that the user is redirected to the dashboard after a successful login
      cy.url().should('include', '/admin-dashboard'); // Adjust this to the post-login page URL
      cy.contains('Welcome - ITc College | Admin').should('be.visible'); // Change this to the success message
     })
   
   
  });
  
  it('should display an error if new password and confirm password do not match', () => {
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('#profile_pic').realHover();
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[2]').click();
    
    cy.get('[name="current_password"]').type('123456') // replace with actual selector
    cy.get('[name="new_password"]').type('123456')         // replace with actual selector
    cy.get('[name="confirm_password"]').type('12345678')     // replace with actual selector
    cy.xpath('//*[@id="main-content"]/section[2]/div/div[2]/div/div/form/div/div[2]/div[4]/div/button').click()     

    // Assertion for error message
    cy.get('#main-content > section.admin-visitor-area.mb-40 > div > div.row > div > div > form > div > div.col-lg-6 > div:nth-child(2) > div > div > span')
    .should('be.visible')
  })

  it('should display an error if current password is incorrect', () => {
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('#profile_pic').realHover();
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[2]').click();

    cy.get('[name="current_password"]').type('12345678') // replace with actual selector
    cy.get('[name="new_password"]').type('1234567')         // replace with actual selector
    cy.get('[name="confirm_password"]').type('1234567')     // replace with actual selector
    cy.xpath('//*[@id="main-content"]/section[2]/div/div[2]/div/div/form/div/div[2]/div[4]/div/button').click()  
    // Assertion for incorrect current password error
    cy.get('#toast-container > div').should('be.visible').should('contain','Failed')
      
  }) 
  it('should display validation errors when fields are in invalid length', () => {
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('#profile_pic').realHover();
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[2]').click();
    // Attempt to submit the form without entering any data
    cy.get('[name="current_password"]').type('123456') // replace with actual selector
    cy.get('[name="new_password"]').type('1234')         // replace with actual selector
    cy.get('[name="confirm_password"]').type('1234')
    cy.xpath('//*[@id="main-content"]/section[2]/div/div[2]/div/div/form/div/div[2]/div[4]/div/button').click()  // Replace with the actual selector for the button

    // Assert that error messages are displayed for each required field
    // Validate error for New Password field
    cy.get('#main-content > section.admin-visitor-area.mb-40 > div > div.row > div > div > form > div > div.col-lg-6 > div:nth-child(2) > div > div > span')
      .should('be.visible')
     // .and('contain', 'The new password field is required.')  // Replace with actual error message text

    // Validate error for Confirm Password field
    cy.get('#main-content > section.admin-visitor-area.mb-40 > div > div.row > div > div > form > div > div.col-lg-6 > div:nth-child(3) > div > div > span')
      .should('be.visible')
     // .and('contain', 'The confirm password field is required.')  // Replace with actual error message text
  })
  it('should display validation errors when fields are empty', () => {
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('#profile_pic').realHover();
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[2]').click();
    // Attempt to submit the form without entering any data
    cy.xpath('//*[@id="main-content"]/section[2]/div/div[2]/div/div/form/div/div[2]/div[4]/div/button').click()  // Replace with the actual selector for the button

    // Assert that error messages are displayed for each required field

    // Validate error for Current Password field
    cy.get('#main-content > section.admin-visitor-area.mb-40 > div > div.row > div > div > form > div > div.col-lg-6 > div:nth-child(1) > div > div > span')
      .should('be.visible')
      .and('contain', 'The current password field is required.')  // Replace with actual error message text

    // Validate error for New Password field
    cy.get('#main-content > section.admin-visitor-area.mb-40 > div > div.row > div > div > form > div > div.col-lg-6 > div:nth-child(2) > div > div > span')
      .should('be.visible')
      .and('contain', 'The new password field is required.')  // Replace with actual error message text

    // Validate error for Confirm Password field
    cy.get('#main-content > section.admin-visitor-area.mb-40 > div > div.row > div > div > form > div > div.col-lg-6 > div:nth-child(3) > div > div > span')
      .should('be.visible')
      .and('contain', 'The confirm password field is required.')  // Replace with actual error message text
  })
 /* it('should successfully change password with valid inputs', () => {
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('#profile_pic').realHover();
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[2]').click();
    
    cy.get('[name="current_password"]').type('1234567') // replace with actual selector
    cy.get('[name="new_password"]').type('123456')         // replace with actual selector
    cy.get('[name="confirm_password"]').type('123456')     // replace with actual selector
    cy.xpath('//*[@id="main-content"]/section[2]/div/div[2]/div/div/form/div/div[2]/div[4]/div/button').click()
    
  })*/
})