import "/src/stylesheets/homepage.css";

const HomePageHeader = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary mt-3 ps-5 pe-5 pt-2 pb-2"
      style={{ zIndex: 1050 }}
    >
      <div className="container-fluid">
        <h1 className="navbar-brand mb-0 fw-bold fs-5 color-config me-5">
          <img
            src="/src/assets/favicon.ico"
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
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-5" href="/about">
                About us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact us
              </a>
            </li>
          </ul>
          <a
            className="btn btn-secondary custom-btn fw-bold fs-7 ps-3 pe-4"
            type="button"
            href="/login"
          >
            <span>
              <img
                src="/src/assets/user_icon.svg"
                alt="Login Icon"
                className="me-2 mb-0"
              />
            </span>{" "}
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default HomePageHeader;
