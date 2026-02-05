import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { AuthProvider } from "./AuthContext.tsx";
import LoginPage from "./webpages/LoginPage.tsx";
import HomePage from "./webpages/HomePage.tsx";
import SignUpPage from "./webpages/SignUpPage.tsx";
import ErrorPage from "./webpages/ErrorPage.tsx";
import AboutPage from "./webpages/AboutPage.tsx";
import ContactPage from "./webpages/ContactPage.tsx";
import { SuccessToast } from "./SuccessToast.tsx";

// new

import NewHomePage from "./dummy webpage/HomePage.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <SuccessToast /> 
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
