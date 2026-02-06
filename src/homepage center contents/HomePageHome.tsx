// import React from "react"; // Not needed if you only use hooks
import ListPostItems from "./item cards/list card/ListPostItems";
import "/src/stylesheets/new/homepage_new.css";
import { useAppStore } from "../useAppStore";

const HomePageHome = () => {
  // Get the current selected city value and the function to change it
  const selectedCity = useAppStore(state => state.selectedCity);
  const setSelectedCity = useAppStore(state => state.setSelectedCity);
  
  // Get the action to open the "Create New Post" modal
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
    // Note: The main useEffect in HomePage.tsx or in the store handles refetching when this value changes.
  };

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="txt-main-label fw-bold fs-4">Forum Posts</div>

        <div className="d-flex flex-row justify-content-end align-items-center gap-2">
          <div className="d-flex align-items-center">
            <select
              className="form-select custom-select d-flex align-items-center"
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
              <option value="All" className="text-center">All</option>
              <option value="Caloocan" className="text-center">Caloocan</option>
              <option value="Metro Manila" className="text-center">Metro Manila</option>
              <option value="Quezon City" className="text-center">Quezon City</option>
            </select>
          </div>

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
      {/* LIST ITEMS HERE */}
      <ListPostItems />
    </div>
  );
};

export default HomePageHome;
