require('cypress-xpath');
import 'cypress-real-events/support';
import 'cypress-file-upload';
describe('DASHBOARD Functionality', () => {

  // Pre-condition: Navigate to the login page before each test
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

  it("Should open dashboard related page when click on dashpoard category",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.xpath('//*[@id="sidebar_menu"]/li[1]/a').click()//click on dashboard category
    cy.url().should('include', '/dashboard'); 

  });

  it("Should be able to open student category from dashboard related page",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.xpath('//*[@id="sidebar_menu"]/li[1]/a').click()//click on dashboard category
    cy.url().should('include', '/dashboard'); 
    cy.xpath('//*[@id="main-content"]/section[1]/div/div/div[2]/div[1]/a').click()//click on student category in the swen page
    cy.url().should('include', '/student-list'); 


  });

  it("Should be able to open teachers category from dashboard related page",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.xpath('//*[@id="sidebar_menu"]/li[1]/a').click()//click on dashboard category
    cy.url().should('include', '/dashboard'); 
    cy.xpath('//*[@id="main-content"]/section[1]/div/div/div[2]/div[2]/a').click()//click on teachers  category in the swen page
    cy.url().should('include', '/staff-directory'); 
  });

  it("Should be able to open parent category from dashboard related page",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.xpath('//*[@id="sidebar_menu"]/li[1]/a').click()//click on dashboard category
    cy.url().should('include', '/dashboard'); 
    cy.xpath('//*[@id="main-content"]/section[1]/div/div/div[2]/div[3]/a').click()//click on parents  category in the swen page
    cy.contains('parents')
  });

  it("Should be able to open staffs category from dashboard related page",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.xpath('//*[@id="sidebar_menu"]/li[1]/a').click()//click on dashboard category
    cy.url().should('include', '/dashboard'); 
    cy.xpath('//*[@id="main-content"]/section[1]/div/div/div[2]/div[4]/a').click()//click on parents  category in the swen page
    cy.url().should('include', '/staff-directory'); 
  });

  it("Should desplay a list with the same numper of items that desplayed on the student category button",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.xpath('//*[@id="sidebar_menu"]/li[1]/a').click()//click on dashboard category
    cy.url().should('include', '/dashboard'); 
    cy.xpath('//*[@id="main-content"]/section[1]/div/div/div[2]/div[1]/a').click()//click on student category in the swen page
    cy.url().should('include', '/student-list'); 
  
    let totalItems = 0;
    const totalPages = 62; // Number of pages in pagination
    const totalExpectedItems = 614;

    // Function to check items on a specific page
    function checkItemsOnPage(pageNumber) {
      // Click on the pagination number
      cy.contains('a.paginate_button', pageNumber.toString()) // Finds the anchor tag with the page number
      .click();

      // Count the number of items on the current page
      cy.xpath('//*[@id="table_id"]/tbody') // Replace 'ul' with the correct list selector
        .children()
        .then(($items) => {
          // Add the number of items on this page to the total
          totalItems += $items.length;
        });
    }

    // Loop through all the pages
    for (let page = 1; page <= totalPages; page++) {
      checkItemsOnPage(page);
    }

    // Assert after visiting all pages
    cy.wrap(null).then(() => {
      expect(totalItems).to.equal(totalExpectedItems);
    });
  });

  it("Should desplay a list with the same numper of items that desplayed on the teachers category from dashboard related page",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.xpath('//*[@id="sidebar_menu"]/li[1]/a').click()//click on dashboard category
    cy.url().should('include', '/dashboard'); 
    cy.xpath('//*[@id="main-content"]/section[1]/div/div/div[2]/div[2]/a').click()//click on teachers  category in the swen page
    cy.url().should('include', '/staff-directory'); 
    let totalItems = 0;
    const totalPages = 5; // Number of pages in pagination
    const totalExpectedItems = 42;

    // Function to check items on a specific page
    function checkItemsOnPage(pageNumber) {
      // Click on the pagination number
      cy.contains('a.paginate_button', pageNumber.toString()) // Finds the anchor tag with the page number
      .click();

      // Count the number of items on the current page
      cy.xpath('//*[@id="table_id"]/tbody') // Replace 'ul' with the correct list selector
        .children()
        .then(($items) => {
          // Add the number of items on this page to the total
          totalItems += $items.length;
        });
    }

    // Loop through all the pages
    for (let page = 1; page <= totalPages; page++) {
      checkItemsOnPage(page);
    }

    // Assert after visiting all pages
    cy.wrap(null).then(() => {
      expect(totalItems).to.equal(totalExpectedItems);
    });

  });

  it("Should be able to open staffs category from dashboard related page",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.xpath('//*[@id="sidebar_menu"]/li[1]/a').click()//click on dashboard category
    cy.url().should('include', '/dashboard'); 
    cy.xpath('//*[@id="main-content"]/section[1]/div/div/div[2]/div[4]/a').click()//click on parents  category in the swen page
    cy.url().should('include', '/staff-directory'); 
    let totalItems = 0;
    const totalPages = 5; // Number of pages in pagination
    const totalExpectedItems = 50;

    // Function to check items on a specific page
    function checkItemsOnPage(pageNumber) {
      // Click on the pagination number
      cy.contains('a.paginate_button', pageNumber.toString()) // Finds the anchor tag with the page number
      .click();

      // Count the number of items on the current page
      cy.xpath('//*[@id="table_id"]/tbody') // Replace 'ul' with the correct list selector
        .children()
        .then(($items) => {
          // Add the number of items on this page to the total
          totalItems += $items.length;
        });
    }

    // Loop through all the pages
    for (let page = 1; page <= totalPages; page++) {
      checkItemsOnPage(page);
    }

    // Assert after visiting all pages
    cy.wrap(null).then(() => {
      expect(totalItems).to.equal(totalExpectedItems);
    });

   });
 /* it("Should be able to add notice to the notice poard and the notice poard is viewed with the added notices",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.xpath('//*[@id="sidebar_menu"]/li[1]/a').click()//click on dashboard category
    cy.url().should('include', '/dashboard'); 
    //cy.contains('Notice Board').should('be.visible')//notice board view 
    //adding valid notice to the notice board
    cy.xpath('//*[@id="main-content"]/section[2]/div/div/div/div[2]/a').should('be.visible').click()//click on add button to add notice to the board
    cy.url().should('include', '/add-notice'); //the add-notice page is shown to add new notice 
    cy.wait(3000)
    cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div/div[1]/div[1]/input').type("test-notice")
    cy.xpath('//*[@id="notice_date"]').clear()
    cy.xpath('//*[@id="notice_date"]').type("10/14/2024")
    cy.xpath('//*[@id="publish_on"]').clear()
    cy.xpath('//*[@id="publish_on"]').type("10/14/2024")
    cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div/div[2]/div[3]/div/div[4]').click
    cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[3]/div/button').click()
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.xpath('//*[@id="sidebar_menu"]/li[1]/a').click()//click on dashboard category
    cy.url().should('include', '/dashboard'); 
    cy.xpath('/html/body/div[2]/div/section[2]/div/div/div/div[3]/table').contains('test-notice')




  })
  it("Should not add notice to the notice poard and the notice with empty required fields",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.xpath('//*[@id="sidebar_menu"]/li[1]/a').click()//click on dashboard category
    cy.url().should('include', '/dashboard'); 
    //cy.contains('Notice Board').should('be.visible')//notice board view 
    //adding valid notice to the notice board
    cy.xpath('//*[@id="main-content"]/section[2]/div/div/div/div[2]/a').should('be.visible').click()//click on add button to add notice to the board
    cy.url().should('include', '/add-notice'); //the add-notice page is shown to add new notice 
    cy.xpath('//*[@id="notice_date"]').clear()
    
    cy.xpath('//*[@id="publish_on"]').clear()
   
    cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[3]/div/button').click()
    cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div/div[1]/div[1]/span').should('be.visible').and('contain','The notice title field is required.')

    cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div/div[2]/div[1]/div/div/span').should('be.visible').and('contain','The notice date field is required.')

    cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div/div[2]/div[2]/div/div/span').should('be.visible').and('contain','The publish on field is required.')


  })*/
    it('Should add a new To-Do item and verify it appears in the listin un completed category and able to mark it as completed', () => {
      // Visit the dashboard page
      cy.visit('https://edu.itc-college.com/admin-dashboard');

      // Click the 'Add' button to open the To-Do modal
      cy.get('[data-target="#add_to_do"]').click(); 

      // Fill in the To-Do title
      const todoTitle = "New Test To-Do Item";
      cy.get('#todo_title').type(todoTitle); 

      // Fill in the date
      cy.get('#startDate').click(); // Open the calendar (update selector)

      cy.get('.datepicker-days').should('be.visible'); // Ensure the calendar is visible

      cy.get('.datepicker-days').within(() => {
         cy.contains('14').should('be.visible').click(); // Click on the 14th day if visible
      });
      
      // Submit the form
      cy.xpath('//*[@id="add_to_do"]/div/div/div[2]/div/form/div/div/div[3]/div/input').click(); // Click the Save button

      // Verify that the modal closes after submission (if necessary)
      cy.get('#add_to_do').should('not.be.visible'); 

      // Verify that the new To-Do item appears in the list
      cy.get('.toDoList').should('contain', todoTitle); // Check for title
     // cy.get('.toDoList').should('contain','10/14/2024'); // Check for date
      cy.get('.toDoListsCompleted').should('not.contain', todoTitle);
    
  });

  it('Should mark a To-Do item as completed and verify it moves to the Completed section', () => {
    // Visit the dashboard page
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    // Assuming the To-Do item has been added as in the previous test
    // Click the checkbox to mark it as completed
    cy.get('.toDoList').contains('New Test To-Do Item').click();
    cy.get('#toDoListsCompleted').click()
    // Verify that the item is now in the Completed section
    cy.get('.toDoListsCompleted').should('contain', 'New Test To-Do Item'); // Check it is in the completed section
    cy.get('#toDoList').click()
    cy.get('.toDoList').should('not.contain', 'New Test To-Do Item'); // Check it is NOT in the uncompleted section
});

  

});