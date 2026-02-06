import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { AuthProvider } from "./AuthContext.tsx";
import SignUpPage from "./webpages/SignUpPage.tsx";
import { SuccessToast } from "./SuccessToast.tsx";

// new

import NewHomePage from "./new webpages/HomePage.tsx";
import NewAboutPage from "./new webpages/AboutPage.tsx";
import NewContactPage from "./new webpages/ContactPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NewHomePage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/about",
    element: <NewAboutPage />,
  },
  {
    path: "/contact",
    element: <NewContactPage />,
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
