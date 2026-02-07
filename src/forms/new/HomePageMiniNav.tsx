import React from "react";
import Select from "react-select/base";
import { useAppStore } from "../../useAppStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faMap,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

const HomePageMiniNav = () => {
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  const selectedCity = useAppStore((state) => state.selectedCity);
  const setSelectedCity = useAppStore((state) => state.setSelectedCity);

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCity(event.target.value);
    // Note: The main useEffect in HomePage.tsx or in the store handles refetching when this value changes.
  };

  return (
    <div className="d-flex flex-row justify-content-end align-items-center gap-2">
      <div className="d-flex align-items-center">
        <div className="d-flex flex-row gap-2 align-items-center justify-content-center">
          <div className="d-flex flex-row gap-1 align-items-center">
            <div>
              <select
                className="form-select d-flex align-items-center"
                style={{
                  backgroundColor: "rgba(48, 24, 36, 0.5)",
                  boxShadow: "none",
                  border: "none",
                }}
              >
                <option value="All" className="text-center">
                  All
                </option>
                <option value="Open" className="text-center">
                  Open
                </option>
                <option value="Adopted" className="text-center">
                  Adopted
                </option>
              </select>
            </div>
            <div>
              <select
                className="form-select d-flex align-items-center"
                style={{
                  backgroundColor: "rgba(48, 24, 36, 0.5)",
                  boxShadow: "none",
                  border: "none",
                }}
                value={selectedCity}
                onChange={handleLocationChange}
              >
                <option value="Everywhere" className="text-center">
                  Everywhere
                </option>
                <option value="Caloocan" className="text-center">
                  Caloocan
                </option>
                <option value="Metro Manila" className="text-center">
                  Metro Manila
                </option>
                <option value="Quezon City" className="text-center">
                  Quezon City
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn d-flex flex-row gap-2 justify-content-center btn-success text-white fw-bold col-1 align-items-center"
        style={{ height: "30px", width: "70px" }}
        onClick={() => setActiveTab("createPost")}
      >
        Post <FontAwesomeIcon icon={faSquarePlus} size="lg" />
      </button>

      <div className="d-flex flex-row gap-3">
        <button type="button" className="btn-invisible">
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="lg"
            className="txt-arrow"
          />
        </button>
        1
        <button type="button" className="btn-invisible">
          <FontAwesomeIcon
            icon={faChevronRight}
            size="lg"
            className="txt-arrow"
          />
        </button>
      </div>
    </div>
  );
};

export default HomePageMiniNav;
