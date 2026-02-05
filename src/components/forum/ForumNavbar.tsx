type ForumNavbarProps = {
  variant: "home" | "inbox";
  // The Props from HomePage
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCity: string;
  setSelectedCity: (val: string) => void;
  currentPage: number;
  lastPage: number;
  onNext: () => void;
  onPrev: () => void;
};

const ForumNavbar = ({ 
  variant, 
  searchQuery, 
  setSearchQuery, 
  selectedCity, 
  setSelectedCity,
  currentPage,
  lastPage,
  onNext,
  onPrev 
}: ForumNavbarProps) => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary ps-2 pe-2 pt-3 pb-3"
      style={{ borderRadius: "7px" }}
    >
      <div className="d-flex flex-column flex-md-row w-100 justify-content-between align-items-lg-center px-3 gap-3">
        <div className="col-12 col-md-3">
          <h1 className="mb-0 fw-bold fs-4 color-config">
            <img
              src="/src/assets/forum_icon.svg"
              className="me-3"
              alt="forum icon"
            />
            Paw Forum
          </h1>
        </div>
        <div className="flex-grow-1">
          {variant === "home" && (
            <div className="d-flex w-100">
              <div className="dropdown me-2">
                {/* 1. Connected the City Filter */}
                <select 
                  className="form-select" 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="All">All Locations</option>
                  <option value="Caloocan">Caloocan</option>
                  <option value="Metro Manila">Metro Manila</option>
                  <option value="Quezon City">Quezon City</option>
                </select>
              </div>
              {/* 2. Connected the Search Box */}
              <input
                className="form-control"
                type="search"
                placeholder="Search for posts..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>
        <button className="btn btn-secondary" onClick={onPrev} 
          disabled={currentPage <= 1} 
          >{"<"}
        </button>
        <button className="btn btn-secondary" 
        onClick={onNext} 
        disabled={currentPage >= lastPage}>
            {">"}
        </button>
      </div>
    </nav>
  );
};

export default ForumNavbar;
