import HomePageNavbarSearch from "./HomePageNavbarSearch";
import { useRef, useEffect } from "react";
import "/src/stylesheets/new/homepage_new.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import * as bootstrap from "bootstrap"; // Ensure bootstrap is installed

const HomePageNavbar = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let popoverInstance: bootstrap.Popover | null = null;

    if (buttonRef.current) {
      popoverInstance = new bootstrap.Popover(buttonRef.current, {
        sanitize: false,
        html: true,
      });

      // 1. Handle Submission
      const handleFormSubmit = (event: SubmitEvent) => {
        const target = event.target as HTMLFormElement;
        if (target && target.classList.contains("needs-validation")) {
          if (!target.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          target.classList.add("was-validated");
        }
      };

      // 2. Handle Typing (Remove error as they type)
      const handleInputChange = (event: Event) => {
        const input = event.target as HTMLInputElement;
        const form = input.closest("form");

        // If the input is now valid, we can change the style
        if (form && form.classList.contains("was-validated")) {
          if (input.checkValidity()) {
            // Optional: You could remove the whole form's validation class
            // but usually, it's better to let CSS handle the transition to 'valid'
          }
        }
      };

      document.addEventListener("submit", handleFormSubmit);
      document.addEventListener("input", handleInputChange); // Listen for typing

      return () => {
        popoverInstance?.dispose();
        document.removeEventListener("submit", handleFormSubmit);
        document.removeEventListener("input", handleInputChange);
      };
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-md custom-nav px-5 p-4">
      <div className="container-fluid d-flex flex-row align-items-center">
        <a href="/" className="text-decoration-none color-inherit">
          <h3 className="fw-bold me-5 d-flex align-items-center mb-0">
            <img
              src="src/assets/favicon.png"
              style={{ width: "50px", height: "50px" }}
              alt="Home4Paws Logo"
              className="me-2"
            />
            <span style={{ color: "white" }}>Home4</span>
            <span className="txt-secondary">Paws</span>
          </h3>
        </a>
        <ul className="navbar-nav gap-5 mb-0 me-auto">
          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "txt-nav-selected" : "txt-nav-unselected"
              }
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "txt-nav-selected" : "txt-nav-unselected"
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
        <HomePageNavbarSearch />
        <button
          ref={buttonRef}
          type="button"
          className="btn btn-login ms-5 px-4"
          data-bs-container="body"
          data-bs-toggle="popover"
          data-bs-custom-class="custom-popover"
          data-bs-placement="bottom"
          data-bs-title="Login"
          data-bs-html="true" // CRITICAL: Allows HTML inside the content
          data-bs-content='
    <form class="p-2 custom-popover needs-validation" novalidate>
      <div class="mb-3">
        <label for="pop-email" class="form-label">Email</label>
        <input type="email" class="form-control custom-popover" id="pop-email" placeholder="email@example.com" style="background-color: #572841; border: none" required>
      </div>
      <div class="mb-3">
        <label for="pop-pass" class="form-label">Password</label>
        <input type="password" class="form-control custom-popover" id="pop-pass" placeholder="Password" style="background-color: #572841; border: none" required>
      </div>
      <button type="submit" class="btn w-100 btn-secondary">Sign in</button>
    </form>'
        >
          Login
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-signup ms-4 px-4"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default HomePageNavbar;
