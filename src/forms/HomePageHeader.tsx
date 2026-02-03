import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "/src/stylesheets/homepage.css";
import { useState } from "react";

interface HomePageHeaderProps {
  whatSelected: string;
}

const HomePageHeader = (props: HomePageHeaderProps) => {
  const [selected] = useState(props.whatSelected);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  return (
    <nav
      className="sticky-top navbar navbar-expand-lg bg-body-tertiary mt-3 ps-5 pe-5 pt-2 pb-2"
      style={{ zIndex: 1050 }}
    >
      <div className="container-fluid">
        <h1 className="navbar-brand mb-0 fw-bold fs-5 color-config me-5">
          <img
            src="/src/assets/favicon.svg"
            alt="Home4Paws Logo"
            className="me-3"
          />
          Home4Paws
        </h1>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${selected === "home" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item mx-lg-5">
              <Link
                to="/about"
                className={`nav-link ${selected === "about" ? "active" : ""}`}
              >
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className={`nav-link ${selected === "contact" ? "active" : ""}`}
              >
                Contact us
              </Link>
            </li>
          </ul>
          {!loading &&
            (user ? (
              <div className="d-flex align-items-center">
                <span className="me-2">Hello, {user.name}</span>
                <button
                  className="btn btn-secondary custom-btn fw-bold fs-7 ps-3 pe-4"
                  type="button"
                  onClick={async () => {
                    await logout();
                    navigate("/login");
                  }}
                >
                  <span>
                    <img
                      src="/src/assets/user_icon.svg"
                      alt="User Icon"
                      className="me-2 mb-0"
                    />
                  </span>
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-secondary custom-btn fw-bold fs-7 ps-3 pe-4"
              >
                <span>
                  <img
                    src="/src/assets/user_icon.svg"
                    alt="Login Icon"
                    className="me-2 mb-0"
                  />
                </span>
                Login
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default HomePageHeader;
