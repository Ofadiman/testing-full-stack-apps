import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, { FunctionComponent, PropsWithChildren } from "react";
import ReactDOM from "react-dom/client";
import { Posts } from "./Posts";
import { QueryClient, QueryClientProvider } from "react-query";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./Login";
import { ErrorPage } from "./ErrorPage";

const queryClient = new QueryClient();

const ProtectedRoute: FunctionComponent<PropsWithChildren> = (props) => {
  const token = window.localStorage.getItem("token");
  if (typeof token !== "string") {
    return <Navigate to={"/"} replace />;
  }

  return props.children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/posts",
    element: (
      <ProtectedRoute>
        <Posts />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <CssBaseline />
  </React.StrictMode>,
);
