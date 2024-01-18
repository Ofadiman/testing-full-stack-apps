describe("home page", () => {
  beforeEach(() => {
    cy.exec("(cd ./db/ && pnpm db:init)");
  });

  it("should open home page", () => {
    cy.visit("/");
  });

  it("should render cards", () => {
    cy.visit("/");
    cy.get('[data-cy="card"]').should("have.length", 10);
  });
});
