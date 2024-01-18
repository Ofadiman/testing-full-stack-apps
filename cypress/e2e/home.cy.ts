describe("login page", () => {
  it("should open login page", () => {
    cy.visit("/");
    cy.contains("login").should("exist");
  });
});
