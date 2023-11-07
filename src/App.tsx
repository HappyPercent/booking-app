import React from "react";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import {LoginPage} from "./LoginPage";
import {ThemeProvider, createTheme} from "@mui/material";
import {RegisterPage} from "./RegisterPage";
import {LOCAL_STORAGE_USER_CREDENTIALS_LABEL} from "./core/constants/localStorage";
import {WorkspacePage} from "./WorkspacePage";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {AreYouPage} from "./AreYouPage";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import uk from "date-fns/locale/en-GB";
import {Layout} from "./Layout";

const queryClient = new QueryClient();
const defaultTheme = createTheme();

const noUserLoader = () => {
  const credentials = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL) || "{}"
  );
  if (!credentials.username || !credentials.password) {
    return redirect("/login");
  }
  return null;
};

const existentUserLoader = () => {
  const credentials = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL) || "{}"
  );
  if (credentials.username && credentials.password) {
    return redirect("/workspace");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <AreYouPage />,
        loader: existentUserLoader,
      },
      {
        path: "workspace",
        element: <WorkspacePage />,
        loader: noUserLoader,
      },
      {
        path: "login",
        element: <LoginPage />,
        loader: existentUserLoader,
      },
      {
        path: "register",
        element: <RegisterPage />,
        loader: existentUserLoader,
      },
      {
        path: "*",
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;
