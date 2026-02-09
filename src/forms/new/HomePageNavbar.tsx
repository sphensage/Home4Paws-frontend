import HomePageNavbarSearch from "./HomePageNavbarSearch";
import { useRef, useEffect } from "react";
import "/src/stylesheets/new/homepage_new.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import { useAppStore } from "../../useAppStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import * as bootstrap from "bootstrap";

const HomePageNavbar = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAppStore((state) => state.user);

  // Check if user is logged in (either via token or store state)
  const isAuthenticated = !!localStorage.getItem("auth_token") && !!user;
  const store = useAppStore();

  const isSearchHidden =
    location.pathname === "/about" || location.pathname === "/contact";

  useEffect(() => {
    let popoverInstance: bootstrap.Popover | null = null;

    if (buttonRef.current && !isAuthenticated) {
      popoverInstance = new bootstrap.Popover(buttonRef.current, {
        sanitize: false,
        html: true,
        trigger: "click",
      });

      const handleFormSubmit = async (event: SubmitEvent) => {
        const target = event.target as HTMLFormElement;

        if (target && target.classList.contains("needs-validation")) {
          event.preventDefault();

          if (!target.checkValidity()) {
            target.classList.add("was-validated");
            return;
          }

          const email = (target.querySelector("#pop-email") as HTMLInputElement)
            .value;
          const pass = (target.querySelector("#pop-pass") as HTMLInputElement)
            .value;

          const success = await store.login(email, pass);

          if (success) {
            popoverInstance?.hide();
            navigate("/"); // Smooth navigation home
          }
        }
      };

      document.addEventListener("submit", handleFormSubmit);

      return () => {
        popoverInstance?.dispose();
        document.removeEventListener("submit", handleFormSubmit);
      };
    }
  }, [isAuthenticated, store, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    store.setSuccessMessage("You have been signed out.");
    store.setActiveTab("home"); // Return to home tab in sidebar
    navigate("/"); // Smooth navigation home
  };

  return (
    <nav className="navbar navbar-expand-md custom-nav px-5 p-4">
      <div className="container-fluid d-flex flex-row align-items-center">
        <NavLink to="/" className="text-decoration-none color-inherit">
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
        </NavLink>

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

        <div
          style={
            {
              display: "contents",
              opacity: isSearchHidden ? 0 : 1,
              visibility: isSearchHidden ? "hidden" : "visible",
              pointerEvents: isSearchHidden ? "none" : "auto",
              transition: "opacity 0.5s ease-in-out",
            } as React.CSSProperties
          }
        >
          <HomePageNavbarSearch />
        </div>

        {isAuthenticated ? (
          <div className="d-flex align-items-center ms-5 gap-3">
            <div className="text-white d-flex align-items-center">
              <div
                className="d-flex flex-row align-items-center"
                style={{ width: "35px", height: "35px" }}
              >
                <FontAwesomeIcon icon={faCircleUser} size="2x"/>
              </div>
              <span className="ms-2 fw-bold">{user?.name || "User"}</span>
            </div>
          </div>
        ) : (
          <>
            <button
              ref={buttonRef}
              type="button"
              className="btn btn-login ms-5 px-4"
              data-bs-container="body"
              data-bs-toggle="popover"
              data-bs-placement="bottom"
              data-bs-title="Login"
              data-bs-html="true"
              data-bs-content='
                <form class="p-2 needs-validation" novalidate>
                  <div class="mb-3">
                    <label for="pop-email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="pop-email" placeholder="email@example.com" style="background-color: #1b1b1b; box-shadow: none; border: none; color: white" required>
                  </div>
                  <div class="mb-3">
                    <label for="pop-pass" class="form-label">Password</label>
                    <input type="password" class="form-control" id="pop-pass" placeholder="Password" style="background-color: #1b1b1b; box-shadow: none; border: none; color: white" required>
                  </div>
                  <button type="submit" class="btn w-100 btn-secondary">Sign in</button>
                </form>'
            >
              Login
            </button>

            <a href="/signup">
              <button
                type="button"
                className="btn btn-secondary btn-signup ms-4 px-4"
              >
                Sign Up
              </button>
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default HomePageNavbar;
