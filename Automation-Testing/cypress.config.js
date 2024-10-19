const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'kmwu2u',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    pageLoadTimeout: 8000000, // Set this to 120 seconds (or higher if needed)
    "env": {
      "allure": true
    },
  },

  
  
});
