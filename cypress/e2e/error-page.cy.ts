describe("error page", () => {
  it("should render error page when user enters a page that does not exist", () => {
    cy.visit("/not-found");
    cy.contains("Oops!").should("exist");
    cy.contains("Sorry, an unexpected error has occurred.").should("exist");
    cy.contains("Not Found").should("exist");
  });
});
