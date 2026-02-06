// import React from "react";
import "/src/stylesheets/new/homepage_new.css";
import ListPostItems from "./item cards/list card/ListPostItems";
import { useAppStore } from "../useAppStore";

export const HomePageTrending = () => {
  // 1. Hook into the store for the filters
  const selectedCity = useAppStore((state) => state.selectedCity);
  const setSelectedCity = useAppStore((state) => state.setSelectedCity);
  const setPostDisplay = useAppStore((state) => state.setPostDisplay);

  const setActiveTab = useAppStore((state) => state.setActiveTab);

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="txt-main-label fw-bold fs-4">Trending posts</div>

        <div className="d-flex flex-row justify-content-end align-items-center gap-2">
          <select
            className="form-select d-flex flex-row align-items-center custom-select"
            style={{
              height: "30px",
              border: "none",
              boxShadow: "none",
              backgroundColor: "#ce7853",
              color: "white",
              textAlign: "center" /* For the options */,
              textAlignLast: "center" /* For the selected value */,
              paddingTop: "0" /* Reset padding to help vertical centering */,
              paddingBottom: "0",
            }}
            value={selectedCity}
            onChange={handleLocationChange}
          >
            <option value="All">All</option>
            <option value="Caloocan">Caloocan</option>
            <option value="Metro Manila">Metro Manila</option>
            <option value="Quezon City">Quezon City</option>
          </select>

          <button
            type="button"
            className="btn d-flex justify-content-center btn-success text-white fw-bold col-2 align-items-center"
            style={{ height: "30px", width: "75px" }}
            onClick={() => setActiveTab("createPost")}
          >
            Post
          </button>
        </div>
      </div>

      {/* 2. Add the List component here - the store handles the "Trending" logic! */}
      <ListPostItems />
    </div>
  );
};
