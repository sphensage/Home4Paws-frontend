import React from "react";
import { useAppStore } from "../../useAppStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

const HomePageMiniNav = () => {
  /* -------- Store Actions & State -------- */
  const setActiveTab = useAppStore((state) => state.setActiveTab);
  const fetchHomePaws = useAppStore((state) => state.fetchHomePaws);

  const selectedCity = useAppStore((state) => state.selectedCity);
  const setSelectedCity = useAppStore((state) => state.setSelectedCity);

  const filterStatus = useAppStore((state) => state.filterStatus);
  const setFilterStatus = useAppStore((state) => state.setFilterStatus);

  // Pagination State from Store
  const currentPage = useAppStore((state) => state.currentPage);
  const lastPage = useAppStore((state) => state.lastPage);

  const user = useAppStore((state) => state.user);

  /* -------- Handlers -------- */

  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = event.target.value as "all" | "available" | "adopted";
    setFilterStatus(val);
    await fetchHomePaws(1);
  };

  const handleLocationChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
    await fetchHomePaws(1);
  };

  // Pagination Handlers
  const handlePrevPage = async () => {
    if (currentPage > 1) {
      await fetchHomePaws(currentPage - 1);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < lastPage) {
      await fetchHomePaws(currentPage + 1);
    }
  };

  /* -------- Styles -------- */
  const selectStyle = {
    backgroundColor: "rgba(48, 24, 36, 0.5)",
    boxShadow: "none",
    border: "none",
    color: "white",
    fontSize: "14px"
  };

  return (
    <div className="d-flex flex-row justify-content-end align-items-center gap-2">
      <div className="d-flex align-items-center">
        <div className="d-flex flex-row gap-2 align-items-center justify-content-center">
          <div className="d-flex flex-row gap-1 align-items-center">

            {/* Status Filter */}
            <div>
              <select
                className="form-select d-flex align-items-center"
                style={selectStyle}
                value={filterStatus}
                onChange={handleStatusChange}
              >
                <option value="all">All</option>
                <option value="available">Open</option>
                <option value="adopted">Adopted</option>
              </select>
            </div>

            {/* City Filter */}
            <div>
              <select
                className="form-select d-flex align-items-center"
                style={selectStyle}
                value={selectedCity}
                onChange={handleLocationChange}
              >
                <option value="All">Everywhere</option>
                <option value="Caloocan">Caloocan</option>
                <option value="Metro Manila">Metro Manila</option>
                <option value="Quezon City">Quezon City</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn d-flex flex-row gap-2 justify-content-center btn-success text-white fw-bold align-items-center"
        style={{ height: "30px", width: "80px", fontSize: "13px" }}
        disabled={!user}
        onClick={() => setActiveTab("createPost")}
      >
        Post <FontAwesomeIcon icon={faSquarePlus} />
      </button>

      {/* Pagination Controls */}
      <div className="d-flex flex-row gap-3 align-items-center ms-2">
        <button
            type="button"
            className="btn-invisible p-0 border-0"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            style={{
                opacity: currentPage <= 1 ? 0.4 : 1,
                cursor: currentPage <= 1 ? "not-allowed" : "pointer"
            }}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="txt-arrow" />
        </button>

        <span className="text-white" style={{ fontSize: "14px", minWidth: "40px", textAlign: "center" }}>
          {currentPage} / {lastPage}
        </span>

        <button
            type="button"
            className="btn-invisible p-0 border-0"
            onClick={handleNextPage}
            disabled={currentPage >= lastPage}
            style={{
                opacity: currentPage >= lastPage ? 0.4 : 1,
                cursor: currentPage >= lastPage ? "not-allowed" : "pointer"
            }}
        >
          <FontAwesomeIcon icon={faChevronRight} className="txt-arrow" />
        </button>
      </div>
    </div>
  );
};

export default HomePageMiniNav;
