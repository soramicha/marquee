import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            console.log("Cypress setup running", { on, config });
        },
    },
});
