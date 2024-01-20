# Cypressing React

Cypressing React is a project that demonstrates the possibilities offered by the [cypress](https://www.cypress.io/) library for testing applications.

## The following test examples are included in the project:

- E2E tests for user login in the application (`cypress/e2e/home.cy.ts`).
- E2E tests for handling the situation when a user enters a page that does not exist (`cypress/e2e/error-page.cy.ts`).
- E2E tests for retrieving data from the API using a token stored in local storage (`cypress/e2e/posts.cy.ts`).
- E2E tests for retrieving data from the API using a token stored in local storage with cypress intercepting HTTP requests and returning artificial responses (`cypress/e2e/posts.intercept.cy.ts`).
- Component testing (`src/components/Counter.cy.tsx`).
