describe("login page", () => {
  it("should open login page", () => {
    cy.visit("/");
    cy.contains("username").should("exist");
    cy.contains("password").should("exist");
    cy.contains("submit", { matchCase: false }).should("exist");
  });

  it("should show error when user enters wrong credentials", () => {
    cy.visit("/");
    cy.contains("username").click({ force: true }).type("ofadiman");
    cy.contains("password").click({ force: true }).type("wrong password");
    cy.contains("submit", { matchCase: false }).click();
    cy.contains("unauthorized", { matchCase: false }).should("exist");
  });

  it("should redirect user to /posts and set token in local storage", () => {
    cy.visit("/");
    cy.contains("username").click({ force: true }).type("ofadiman");
    cy.contains("password").click({ force: true }).type("pass1");
    cy.contains("submit", { matchCase: false }).click();
    cy.url().should("include", "/posts");
  });
});
