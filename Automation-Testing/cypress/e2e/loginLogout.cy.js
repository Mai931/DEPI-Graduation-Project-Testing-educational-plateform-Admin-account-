require('cypress-xpath');
import 'cypress-real-events/support';
describe('Login Page Test', () => {

  // Pre-condition: Navigate to the login page before each test
  beforeEach(() => {
    cy.visit('https://edu.itc-college.com/login'); // Change this to the URL of your login page
  });

  // Test Case 1: Verify successful login
  it('should log in successfully with valid credentials', () => {

    // Enter valid username and password
    cy.get('#email-address').type('admaane@gmail.com'); // Change to the correct input field and value
    cy.get('#password').type('123456'); // Change to the correct input field and value
    
    // Click on the login button
    cy.get('button[type="submit"]').click();
    
    // Verify that the user is redirected to the dashboard after a successful login
    cy.url().should('include', '/admin-dashboard'); // Adjust this to the post-login page URL
    cy.contains('Welcome - ITc College | Admin').should('be.visible'); // Change this to the success message
  });

  // Test Case 2: Verify login failure with incorrect credentials
  it('should show an error message with invalid credentials', () => {

    // Enter invalid username and password
    cy.get('#email-address').type('admmm@gmail.com');
    cy.get('#password').type('12345');
    
    // Click on the login button
    cy.get('button[type="submit"]').click();
    
    // Verify that an error message is displayed
    cy.contains('بيانات الاعتماد هذه لا تتطابق مع سجلاتنا').should('be.visible'); // Change to the actual error message
  });
  
  // Test Case 3: Verify error for empty username and password fields
  it('should show validation error for empty fields', () => {
    // Click the login button without entering username and password
    cy.get('button[type="submit"]').click();
    
    // Verify that validation errors are shown for both fields
    cy.contains('The email field is required.').should('be.visible'); // Change to the actual validation message
    cy.contains('The password field is required.').should('be.visible'); // Change to the actual validation message
  });

  // Test Case 4: Verify password masking (password field should hide the text)
  it('should mask the password field', () => {
   
    // Enter a password in the password field
    cy.get('#email-address').type('somePassword');
    
    // Verify that the password is masked (hidden)
    cy.get('#password').should('have.attr', 'type', 'password');
  });

  // Test Case 5: Verify "Remember Me" checkbox
  it('should allow checking the "Remember Me" checkbox', () => {
    
    // Click the "Remember Me" checkbox
    cy.get('label[for="rememberMe"]').click(); // Adjust selector if needed
    
    // Verify that the checkbox is checked
    cy.get('#rememberMe').should('be.checked');
    cy.reload();

    // Step 6: Verify the user is still logged in (e.g., by checking cookies or local storage)
    cy.getCookie('session_id').should('exist');  // Check if session cookie exists (replace with your actual cookie name)

    // Alternatively, check if the user is still logged in by verifying UI elements
    cy.url().should('include', '/admin-dashboard');  // Ensure still on dashboard after reload
    cy.get('.welcome-message').should('contain.text', 'Welcome'); 
  });

  // Test Case 6: Verify forgot password link
  it('should navigate to the Forgot Password page', () => {
    
    // Click on the "Forgot Password" link
    cy.contains('نسيت كلمة المرور').click();
    
    // Verify that the user is taken to the Forgot Password page
    cy.url().should('include', '/recovery/password'); // Adjust this to the actual forgot password URL
  });

});
describe('logout Test', () => {

  // Pre-condition: Navigate to the login page before each test
  beforeEach(() => {
    cy.visit('https://edu.itc-college.com/login'); // Change this to the URL of your login page
    cy.get('#email-address').type('admaane@gmail.com'); // Change to the correct input field and value
    cy.get('#password').type('123456'); // Change to the correct input field and value
    
    // Click on the login button
    cy.get('button[type="submit"]').click();
    
    // Verify that the user is redirected to the dashboard after a successful login
    cy.url().should('include', '/admin-dashboard');
  });
  it('should log the user out and redirect to login page', () => {
    allure.feature('Log out');
    allure.story('User logs out with successfully');
    cy.get('#profile_pic').realHover();
  
    //cy.get('.profile_info_details')  // Selector for the list items
     // .should('have.length', 2); 
    //cy.get('.profile_info_details').eq(2).click();  // Click the 3rd item in the list
    
    // Step 3: Click the logout button or link
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[3]').click();  // Adjust with the actual selector for the logout button/link

    // Step 4: Verify that the user is redirected to the login page
    cy.url().should('include', '/login');  // Adjust with the actual login page URL

    // Step 5: Optionally, ensure session storage or cookies are cleared
    cy.window().then((win) => {
      expect(win.localStorage.getItem('authToken')).to.be.null;  // Example for clearing tokens
    });

    // You can also check if cookies related to the session are cleared
    cy.getCookie('session_id').should('not.exist');  // Adjust with the actual session cookie name

   
  });
  it('should prevent access to the dashboard after logout when using the back button', () => {
    cy.get('#profile_pic').realHover();
  
    //cy.get('.profile_info_details')  // Selector for the list items
     // .should('have.length', 2); 
    //cy.get('.profile_info_details').eq(2).click();  // Click the 3rd item in the list
    
    // Step 3: Click the logout button or link
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[3]').click();  // Adjust with the actual selector for the logout button/link

    // Step 4: Verify that the user is redirected to the login page
    cy.url().should('include', '/login');  // Adjust with the actual login page URL

    cy.go('back');  // Cypress command to simulate back button

    // Step 6: Verify that the user is NOT allowed back on the dashboard page
    // They should either remain on the login page or be redirected to login
    cy.url().should('include', '/login');  // Ensure still on login page
   // cy.visit('https://edu.itc-college.com/admin-dashboard');  // Replace with the dashboard URL

    // Step 8: Verify that the user is redirected back to the login page due to lack of session
   // cy.url().should('include', '/login');  // Ensure they are sent back to login
   
  });
  it('should log out the user in all tabs when logging out in one tab', () => {
    cy.getCookies().then((cookies) => {
    // Store the cookies for later use in the "second tab"
    cy.wrap(cookies).as('sessionCookies');
  });

  // Step 4: Open a new "tab" (another page visit) and set the stored session cookies
  cy.window().then((win) => {
    // Simulate opening a new tab by revisiting the page and setting the stored cookies
    cy.visit('https://edu.itc-college.com/admin-dashboard');  // Open the dashboard in the second tab
    cy.get('@sessionCookies').then((cookies) => {
      cookies.forEach(cookie => {
        cy.setCookie(cookie.name, cookie.value);  // Restore the session cookies in the second tab
      });
    });
  });

  // Step 5: Verify the user is still logged in the second tab
  cy.visit('https://edu.itc-college.com/admin-dashboard');  // Simulate revisiting the dashboard in the second tab
  cy.url().should('include', '/admin-dashboard');  // Ensure they are still logged in
  cy.contains('Welcome - ITc College | Admin').should('be.visible'); // Confirm they are still logged in

  // Step 6: Log out in the first "tab" by clicking the logout button
  cy.visit('https://edu.itc-college.com/admin-dashboard');
  cy.get('#profile_pic').realHover();  // Ensure you are in the first tab context
  cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[3]').click();
  // Step 7: Verify the user is redirected to the login page after logout
  cy.url().should('include', '/login');
 // cy.get('h1').should('contain.text', 'Login');  // Adjust based on your login page content

  // Step 8: Go back to the second tab and verify that the user is logged out there as well
  cy.visit('https://edu.itc-college.com/admin-dashboard');  // Simulate going back to the second tab
  cy.url().should('include', '/login');  // User should be redirected back to the login page
 // cy.get('h1').should('contain.text', 'Login');  // Verify that they are on the login page
});

});
