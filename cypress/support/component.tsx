import "./commands";

import { mount } from "cypress/react18";
import { createTheme, ThemeProvider } from "@mui/material/styles";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", (component) => {
  return mount(
    <ThemeProvider theme={createTheme()}>{component}</ThemeProvider>,
    {
      strict: true,
    },
  );
});
