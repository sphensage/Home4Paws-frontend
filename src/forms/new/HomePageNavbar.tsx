import HomePageNavbarSearch from "./HomePageNavbarSearch";
import "/src/stylesheets/new/homepage_new.css";
import { Link } from "react-router-dom";

const HomePageNavbar = () => {
  return (
    <nav className="navbar navbar-expand-md custom-nav px-5 p-4">
      <div className="container-fluid d-flex flex-row align-items-center">
        <h3 className="fw-bold me-5 d-flex align-items-center">
          <img
            src="src\assets\favicon.png"
            style={{ width: "50px", height: "50px" }}
          />
          Home4<span className="txt-secondary">Paws</span>
        </h3>
        <ul className="navbar-nav gap-5 mb-0 me-auto">
          <li className="navbar-item">
            <Link to="/about" className="txt-nav-unselected">
              About
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="txt-nav-unselected">
              Contact Us
            </Link>
          </li>
        </ul>
        <HomePageNavbarSearch />
        <button type="button" className="btn btn-login ms-5 px-4">
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
