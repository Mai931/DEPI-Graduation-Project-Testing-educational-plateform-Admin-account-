require('cypress-xpath');
import 'cypress-real-events/support';
import 'cypress-file-upload';
describe('profile page', () => {

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
  it("Should be able to view profile page",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
  
    cy.get('#profile_pic').realHover();
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
    cy.url().should('include','/view-staff/50')

  });

  it("Should be able to click on and view all the categories",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard')
  
    cy.get('#profile_pic').realHover()
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click()
    cy.url().should('include','/view-staff/50')
    cy.get('a.nav-link[href="#studentProfile"]').click()
    cy.contains('Personal Info')
    cy.get('a.nav-link[href="#payroll"]').click()
    cy.contains('Payslip')
    cy.get('a.nav-link[href="#leaves"]').click()
    cy.contains('Leave To')
    cy.get('a.nav-link[href="#staffDocuments"]').click({ force: true })//documents
    cy.contains('Document Title')
    cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[2]/div/ul/li[5]').click({ force: true })//timeline
    cy.xpath('//*[@id="staffTimeline"]/div/div/button').should('exist')
    
   
  });
  it("Should separate between staff details and categories",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('#profile_pic').realHover();
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
    cy.url().should('include','/view-staff/50')
    cy.get('.nav-link[href="#studentProfile"]').click()
    cy.contains('Staff Details')
    cy.get('.student-meta-box').should('be.visible')
    cy.get('.nav-link[href="#payroll"]').click()
    cy.contains('Staff Details')
    cy.get('.student-meta-box').should('be.visible')
    cy.get('.nav-link[href="#leaves"]').click()
    cy.contains('Staff Details')
    cy.get('.student-meta-box').should('be.visible')
    cy.get('.nav-link[href="#staffDocuments"]').click({force:true})
    cy.contains('Staff Details')
    cy.get('.student-meta-box').should('be.visible')
    cy.get('.nav-link[href="#staffTimeline"]').click({force:true})
    cy.contains('Staff Details')
    cy.get('.student-meta-box').should('be.visible')
    

  });
  it("Should open edit bage to edit staff data",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('#profile_pic').realHover();
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
    cy.url().should('include','/view-staff/50')
    cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
    cy.url().should('include','/edit-staff/50')
    cy.contains('Edit Staff')
   
  });
  it("All Categouries in edit page should contain items to be edited",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('#profile_pic').realHover();
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
    cy.url().should('include','/view-staff/50')
    cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
    cy.url().should('include','/edit-staff/50')
    cy.get('.nav-link[href="#basic_info"]').click()
    cy.xpath('//*[@id="basic_info"]/div').should('exist').and('not.be.empty');
    cy.get('.nav-link[href="#payroll_details"]').click()
    cy.xpath('//*[@id="payroll_details"]/div').should('exist').and('not.be.empty');
    cy.get('.nav-link[href="#bank_info_details"]').click()
    cy.xpath('//*[@id="bank_info_details"]/div').should('exist').and('not.be.empty');
    cy.get('.nav-link[href="#social_link_details"]').click({force:true})
    cy.xpath('//*[@id="social_link_details"]/div').should('exist').and('not.be.empty');
    cy.get('.nav-link[href="#document_info"]').click({force:true})
    cy.xpath('//*[@id="document_info"]/div').should('exist').and('not.be.empty');
    cy.get('.nav-link[href="#custom_field"]').click({force:true})
    cy.xpath('//*[@id="custom_field"]/div').should('exist').and('not.be.empty');
    
    

  })
  it("first name field shouldn't be plank in basic info editing",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('#profile_pic').realHover();
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
    cy.url().should('include','/view-staff/50')
    cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
    cy.url().should('include','/edit-staff/50')
    cy.get('.nav-link[href="#basic_info"]').click()//click on pasic info category
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[1]/div/input').clear()//clear data in first name
    cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[7]/div/div/div/div/button').click()//submit data
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[1]/div/span').should('be.visible')//assertion error message

  })
  it("Should accept aracbic and english chars in first and last name fields in basic info editing",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('#profile_pic').realHover();
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
    cy.url().should('include','/view-staff/50')
    cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
    cy.url().should('include','/edit-staff/50')
    cy.get('.nav-link[href="#basic_info"]').click()//click on pasic info category
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[1]/div/input').clear()//clear data in first name
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[1]/div/input').type("ahmed")
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[2]/div/input').clear({force:true})
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[2]/div/input').type("mohamed")
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/input').clear()
    cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[7]/div/div/div/div/button').click()//submit data
    cy.xpath('//*[@id="toast-container"]/div').should('be.visible').should('contain','Success')
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[1]/div/input').clear()//clear data in first name
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[1]/div/input').type("أحمد")
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[2]/div/input').clear({force:true})
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[2]/div/input').type("محمد")
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/input').clear()
    cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[7]/div/div/div/div/button').click()//submit data
    cy.xpath('//*[@id="toast-container"]/div').should('be.visible').should('contain','Success')


  })
  it("Sould not accept aspecial chars or numpers in first and last name fields in basic info editing",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('#profile_pic').realHover();
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
    cy.url().should('include','/view-staff/50')
    cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
    cy.url().should('include','/edit-staff/50')
    cy.get('.nav-link[href="#basic_info"]').click()//click on pasic info category
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[1]/div/input').clear()//clear data in first name
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[1]/div/input').type("@#$%")
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[2]/div/input').clear({force:true})
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[2]/div/input').type("@#$^&")
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/input').clear()
    cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[7]/div/div/div/div/button').click()//submit data
    cy.xpath('//*[@id="toast-container"]/div').should('be.visible').should('contain','Failed')
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[1]/div/input').clear()//clear data in first name
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[1]/div/input').type("12345")
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[2]/div/input').clear({force:true})
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[2]/div/input').type("123456")
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/input').clear()
    cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[7]/div/div/div/div/button').click()//submit data
    cy.xpath('//*[@id="toast-container"]/div').should('be.visible').should('contain','Failed')


  })
  it("Sould accept phone numper that contain numpers only and in valid format",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('#profile_pic').realHover();
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
    cy.url().should('include','/view-staff/50')
    cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
    cy.get('.nav-link[href="#basic_info"]').click()//click on pasic info category
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/input').clear()
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/input').type("01012345678")
    cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[7]/div/div/div/div/button').click()
    cy.xpath('//*[@id="toast-container"]/div').should('be.visible').should('contain','Success')
    })
  it("Souldn't accept phone numper that contain numpers only and in invalid format",()=>{
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('#profile_pic').realHover();
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
    cy.url().should('include','/view-staff/50')
    cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
    cy.url().should('include','/edit-staff/50')
    cy.get('.nav-link[href="#basic_info"]').click()//click on pasic info category
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/input').clear()
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/input').type("0101234")
    cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[7]/div/div/div/div/button').click()
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/span').should('be.visible').should('contain','Success')
     
      })
    it('Should verify gender dropdown options and selection', () => {
      // Visit the page containing the dropdown (replace with your actual URL)
      cy.visit('https://edu.itc-college.com/admin-dashboard');
      cy.get('#profile_pic').realHover();
      cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
      cy.url().should('include','/view-staff/50')
      cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
      cy.url().should('include','/edit-staff/50')
      cy.get('.nav-link[href="#basic_info"]').click()//click on pasic info category
      cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/input').clear()
      
      // Open the gender dropdown
      cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[3]/div/div')  // Use the actual class or ID for the gender dropdown
        .click();
  
      // Verify the options in the dropdown
      cy.get('.list')  // Use actual class for the dropdown menu
        .should('contain', 'Male')
        .and('contain', 'Female')
        .and('contain', 'Others');
  
      // Select "Male" from the dropdown and verify it is selected
      cy.get('.list').contains('Male').click();
      cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[3]/div/div').should('contain', 'Male');
  
      // Re-open the dropdown to select "Female"
      cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[3]/div/div').click();
      cy.get('.list').contains('Female').click();
      cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[3]/div/div').should('contain', 'Female');
  
      // Re-open the dropdown to select "Others"
      cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[3]/div/div').click();
      cy.get('.list').contains('Others').click();
      cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[3]/div/div').should('contain', 'Others');
    });
  
    it('Should validate date of birth input with manual entry, calendar selection', () => {
      // Visit the page
      cy.visit('https://edu.itc-college.com/admin-dashboard');
      cy.get('#profile_pic').realHover();
      cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
      cy.url().should('include','/view-staff/50')
      cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
      cy.url().should('include','/edit-staff/50')
      cy.get('.nav-link[href="#basic_info"]').click()//click on pasic info category
      cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/input').clear()
  
      // ==== Part 1: Manually enter a valid date ====
      cy.get('#date_of_birth') // Update the selector as needed
        .clear() // Clear the field first
        .type('01/15/1990') // Manually type the date
        .should('have.value', '01/15/1990') // Assert the typed value
      //  .invoke('val').should('match', validDateFormat); // Check for valid format
      cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[7]/div/div/div/div/button').click()
      cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/span').should('be.visible').should('contain','Success')
         
  
      // ==== Part 2: Select a date from the calendar ====
      cy.get('#date_of_birth').click(); // Open the calendar (update selector)
      cy.get('.datepicker-days.table-condensed.day').contains('15').click(); // Select day 15 from the calendar
      cy.get('.datepicker-days.table-condensed.month').contains('jan').click();
      cy.get('.datepicker-days.table-condensed.year').contains('1990').click();
      // Verify that the selected date is correctly populated
      cy.get('#dob-input').should('have.value', '01/15/1990')
      //  .invoke('val').should('match', validDateFormat); // Verify valid format again
      cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[7]/div/div/div/div/button').click()
      cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/span').should('be.visible').should('contain','Success')
           
    
    })
      it('Should not validate invalid date of birth input with manual entry, calendar selection', () => {
        // Visit the page
        cy.visit('https://edu.itc-college.com/admin-dashboard');
        cy.get('#profile_pic').realHover();
        cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
        cy.url().should('include','/view-staff/50')
        cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
        cy.url().should('include','/edit-staff/50')
        cy.get('.nav-link[href="#basic_info"]').click()//click on pasic info category
        cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/input').clear()
    
        // ==== Part 1: Manually enter a valid date ====
        cy.get('#date_of_birth') // Update the selector as needed
          .clear() // Clear the field first
          .type('12/15/2024') // Manually type the date
          .should('have.value', '12/15/2024') // Assert the typed value
        //  .invoke('val').should('match', validDateFormat); // Check for valid format
        cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[7]/div/div/div/div/button').click()
        cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/span').should('be.visible').should('contain','Failed')
           
    
        // ==== Part 2: Select a date from the calendar ====
        cy.get('#date_of_birth').click(); // Open the calendar (update selector)
        cy.get('.datepicker-days.table-condensed.day').contains('15').click(); // Select day 15 from the calendar
        cy.get('.datepicker-days.table-condensed.month').contains('dec').click();
        cy.get('.datepicker-days.table-condensed.year').contains('2024').click();
        // Verify that the selected date is correctly populated
        cy.get('#dob-input').should('have.value', '01/15/1990')
        //  .invoke('val').should('match', validDateFormat); // Verify valid format again
        cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[7]/div/div/div/div/button').click()
        cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/span').should('be.visible').should('contain','Failed')
             
      
      })
    it('Should upload a staff photo successfully', () => {
      cy.visit('https://edu.itc-college.com/admin-dashboard');
      cy.get('#profile_pic').realHover();
      cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
      cy.url().should('include','/view-staff/50')
      cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
      cy.url().should('include','/edit-staff/50')
      cy.get('.nav-link[href="#basic_info"]').click()//click on pasic info category
      cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/input').clear()
  
      // Ensure the 'Browse' button for photo upload is visible
      cy.xpath('//*[@id="pic"]/label').should('exist').and('be.visible');
  
      // Define the file path for the image you want to upload
      const fileName = 'staff-photo.PNG'; // replace with the actual file name
     // const filePath = `staff-photo.PNG`; // replace with the actual file path in the fixtures folder
      cy.xpath('//*[@id="pic"]/label').click({force:true})
      // Upload the file using the 'Browse' button
      /*cy.xpath('//*[@id="pic"]/label').attachFile(fileName,{force:true});
      cy.wait(1000);*/
      cy.xpath("//input[@type='file']")
      .attachFile(fileName)
      .then(() => {
        cy.log('File uploaded:', fileName); // Log for debugging
      });
     
      // Verify the file has been uploaded by checking if the file name or a preview appears
      cy.xpath('//*[@id="placeholderStaffsName"]') // Adjust selector as per your page
      .should('have.attr', 'placeholder', fileName) // Check if the file name or preview is displayed
      .then(() => {
        cy.log('Upload verified in primary_input'); // Log for debugging
    });

  
  })
  it('Should not upload other files that not image files a staff photo successfully', () => {
    cy.visit('https://edu.itc-college.com/admin-dashboard');
    cy.get('#profile_pic').realHover();
    cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
    cy.url().should('include','/view-staff/50')
    cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
    cy.url().should('include','/edit-staff/50')
    cy.get('.nav-link[href="#basic_info"]').click()//click on pasic info category
    cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/input').clear()

    // Ensure the 'Browse' button for photo upload is visible
    cy.xpath('//*[@id="pic"]/label').should('exist').and('be.visible');

    // Define the file path for the image you want to upload
    const fileName = 'ch1.pdf'; // replace with the actual file name
   // const filePath = `staff-photo.PNG`; // replace with the actual file path in the fixtures folder
    cy.xpath('//*[@id="pic"]/label').click({force:true})
    // Upload the file using the 'Browse' button
    /*cy.xpath('//*[@id="pic"]/label').attachFile(fileName,{force:true});
    cy.wait(1000);*/
    cy.xpath("//input[@type='file']")
    .attachFile(fileName)
    .then(() => {
      cy.log('File uploaded:', fileName); // Log for debugging
    });
    
    // Verify the file has been uploaded by checking if the file name or a preview appears
    cy.xpath('//*[@id="placeholderStaffsName"]') // Adjust selector as per your page
    .should('not.have.attr', 'placeholder', fileName) // Check if the file name or preview is displayed
   
})
it('Should accept valid inputs for both current and permanent address fields', () => {
  cy.visit('https://edu.itc-college.com/admin-dashboard');
  cy.get('#profile_pic').realHover();
  cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
  cy.url().should('include','/view-staff/50')
  cy.xpath('//*[@id="main-content"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
  cy.url().should('include','/edit-staff/50')
  cy.get('.nav-link[href="#basic_info"]').click()//click on pasic info category
  cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/input').clear()
  // Define valid test data for both addresses
  const currentAddress = '123 Valid Current Street, Valid City, Valid Country';
  const permanentAddress = '456 Valid Permanent Street, Valid City, Valid Country';

  cy.xpath('//*[@id="current_address"]').clear()
  // Fill the current address field (using XPath)
  cy.xpath('//*[@id="current_address"]').type(currentAddress);

  // Verify that the current address field contains the correct value
  cy.xpath('//*[@id="current_address"]')
    .should('have.value', currentAddress);

  cy.xpath('//*[@id="permanent_address"]').clear()

  // Fill the permanent address field (using XPath)
  cy.xpath('//*[@id="permanent_address"]').type(permanentAddress);

  // Verify that the permanent address field contains the correct value
  cy.xpath('//*[@id="permanent_address"]')
    .should('have.value', permanentAddress);

  cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[7]/div/div/div/div/button').click()
  cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/span').should('be.visible').should('contain','Success')
             
      
});
it('Should handle invalid inputs for both current and permanent address fields', () => {
  cy.visit('https://edu.itc-college.com/admin-dashboard');
  cy.get('#profile_pic').realHover();
  cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
  cy.url().should('include','/view-staff/50')
  cy.xpath('//*[@id="main-co  ntent"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
  cy.url().should('include','/edit-staff/50')
  cy.get('.nav-link[href="#basic_info"]').click()//click on pasic info category
  cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/input').clear()

  // Define invalid test data for both addresses
  const invalidCurrentAddress = '!@#$%^&*()'; // Invalid characters
  const invalidPermanentAddress = '@#$%&()!~';         // Empty input

 cy.xpath('//*[@id="current_address"]').clear()
  // Fill the current address field (using XPath)
  cy.xpath('//*[@id="current_address"]').type(invalidCurrentAddress);

  // Verify that the current address field contains the correct value
  cy.xpath('//*[@id="current_address"]')
    .should('have.value', invalidCurrentAddress);

  cy.xpath('//*[@id="permanent_address"]').clear()

  // Fill the permanent address field (using XPath)
  cy.xpath('//*[@id="permanent_address"]').type(invalidPermanentAddress);

  // Verify that the permanent address field contains the correct value
  cy.xpath('//*[@id="permanent_address"]')
    .should('have.value', invalidPermanentAddress);
  cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[7]/div/div/div/div/button').click()
  cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/span').should('be.visible').should('contain','Failed')
             
      
});
it('Should allow editing social media URLs in the profile with valid inputs', () => {
  cy.visit('https://edu.itc-college.com/admin-dashboard');
  cy.get('#profile_pic').realHover();
  cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
  cy.url().should('include','/view-staff/50')
  cy.xpath('//*[@id="main-co  ntent"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
  cy.url().should('include','/edit-staff/50')
  cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[4]/a').click({force:true})//urls button selector




  // Define valid URLs to be used in the test
  const facebookUrl = 'https://www.facebook.com/exampleUser';
  const twitterUrl = 'https://www.twitter.com/exampleUser';
  const linkedinUrl = 'https://www.linkedin.com/in/exampleUser';
  const instagramUrl = 'https://www.instagram.com/exampleUser';

  // 1. Facebook URL field: Verify the field exists and can be edited
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[1]/div/input').should('exist').clear().type(facebookUrl);
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[1]/div/input').should('have.value', facebookUrl);

  // 2. Twitter URL field: Verify the field exists and can be edited
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[2]/div/input').should('exist').clear().type(twitterUrl);
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[2]/div/input').should('have.value', twitterUrl);

  // 3. LinkedIn URL field: Verify the field exists and can be edited
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[3]/div/input').should('exist').clear().type(linkedinUrl);
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[3]/div/input').should('have.value', linkedinUrl);

  // 4. Instagram URL field: Verify the field exists and can be edited
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[4]/div/input').should('exist').clear().type(instagramUrl);
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[4]/div/input').should('have.value', instagramUrl);

  // Optionally: Save the profile and verify changes are persisted
  cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[7]/div/div/div/div/button').click();
  cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/span').should('be.visible').should('contain','Success')
})
it('Should allow editing social media URLs in the profile with valid inputs', () => {
  cy.visit('https://edu.itc-college.com/admin-dashboard');
  cy.get('#profile_pic').realHover();
  cy.xpath('//*[@id="main-nav-for-chat"]/div/div/div/div[5]/div[5]/div[2]/div/a[1]').click();
  cy.url().should('include','/view-staff/50')
  cy.xpath('//*[@id="main-co  ntent"]/section[2]/div/div/div[2]/div/ul/li[6]/a').click({force:true})//edit button selector
  cy.url().should('include','/edit-staff/50')
  cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[4]/a').click({force:true})//urls button selector



  // Define valid URLs to be used in the test
  const invalidUrl= 'invalid_url_string';

  // 1. Facebook URL field: Verify the field exists and can be edited
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[1]/div/input').should('exist').clear().type(invalidUrl);
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[1]/div/input').should('have.value',invalidUrl);

  // 2. Twitter URL field: Verify the field exists and can be edited
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[2]/div/input').should('exist').clear().type(invalidUrl);
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[2]/div/input').should('have.value', invalidUrl);

  // 3. LinkedIn URL field: Verify the field exists and can be edited
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[3]/div/input').should('exist').clear().type(invalidUrl);
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[3]/div/input').should('have.value',invalidUrl);

  // 4. Instagram URL field: Verify the field exists and can be edited
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[4]/div/input').should('exist').clear().type(invalidUrl);
  cy.xpath('//*[@id="social_link_details"]/div/div/div/div/div[4]/div/input').should('have.value', invalidUrl);

  // Optionally: Save the profile and verify changes are persisted
  cy.xpath('//*[@id="main-content"]/section[2]/div/form/div/div/div/div[2]/div[1]/ul/li[7]/div/div/div/div/button').click();
  cy.xpath('//*[@id="basic_info"]/div/div/div/div/div[5]/div/span').should('be.visible').should('contain','Failed')
})
  
})