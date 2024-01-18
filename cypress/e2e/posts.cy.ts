describe("posts page", () => {
  it("should show error when user has no valid access token in local storage", () => {
    cy.visit("/posts", {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("token", null);
      },
    });
    cy.contains("error", { matchCase: false });
  });

  it("should fetch list of posts", () => {
    cy.visit("/posts", {
      onBeforeLoad: (win) => {
        win.localStorage.setItem(
          "token",
          "d7720048-d6a0-4a6e-a32f-3900e266be9a",
        );
      },
    });
    cy.get("[data-cy='card']").should("have.length", 10);
  });
});
