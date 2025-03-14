/* eslint-disable no-undef */
describe("Login Test", () => {
    it("Logs in successfully", () => {
        cy.visit("http://localhost:5173/login");
        //cy.visit('https://happy-sea-0b99f111e.6.azurestaticapps.net/login');

        cy.get('input[data-testid = "email-input"]').type(
            "nluong03@calpoly.edu"
        );
        cy.get('input[data-testid = "password-input"]').type("marquee");

        //click sign in button
        cy.get('[data-testid = "sign-in-button"]').click();
    });
});
