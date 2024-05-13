# Cypressing React

Cypressing React is a project that demonstrates the possibilities offered by the [cypress](https://www.cypress.io/) library for testing applications.

## Test cases in the project

- E2E tests for the login page.
- E2E tests for 404 page.
- E2E tests for posts page.
- Component tests for `<Counter />` component.
- Unit tests for `add` function.

## Code coverage

The code in the project has 100% test coverage.

The following commands are available to run tests:

- `test:clean` - Remove code coverage artifacts from previous cypress runs.
- `test:cypress:e2e:ci` - Run E2E tests and generate code coverage report for them.
- `test:cypress:component:ci` - Run component tests and generate code coverage report for them.
- `test:cypress:ci` - Remove code coverage artifacts from previous cypress runs, run E2E and component tests and generate code coverage report for them.
