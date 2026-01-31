// import React from 'react'

const ForumHeader = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary ps-2 pe-2 pt-3 pb-3"
      style={{ borderRadius: "7px" }}
    >
      <div className="d-flex flex-column flex-md-row w-100 justify-content-between align-items-lg-center px-3 gap-3">
        <div className="col-12 col-md-3">
          <h1 className="navbar-brand mb-0 fw-bold fs-4 color-config">
            Paw Forum
          </h1>
        </div>
        <div className="flex-grow-1">
          <form className="d-flex w-100" role="search">
            <div className="dropdown me-2">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Select location
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item">Caloocan</button>
                </li>
                <li>
                  <button className="dropdown-item">Metro Manila</button>
                </li>
                <li>
                  <button className="dropdown-item">Quezon City</button>
                </li>
              </ul>
            </div>
            <input
              className="form-control"
              type="search"
              placeholder="Search for posts..."
              aria-label="Search"
            />
          </form>
        </div>
        <button className="btn btn-secondary">previous</button>
        <button className="btn btn-secondary">next</button>
      </div>
    </nav>
  );
};

export default ForumHeader;
