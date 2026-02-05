// import React from "react";
import "/src/stylesheets/new/homepage_new.css";

export const HomePageTrending = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="txt-main-label fw-bold fs-4">Trending posts</div>

        <div className="d-flex flex-row justify-content-end align-items-center gap-2">
          <select
            className="form-select d-flex flex-row align-items-center custom-select"
            aria-label="Default select example"
            style={{
              height: "30px",
              border: "none",
              boxShadow: "none",
              backgroundColor: "#ce7853",
              color: "white",
            }}
          >
            <option selected>-- Select location --</option>
            <option value="1">Caloocan</option>
            <option value="2">Metro Manila</option>
            <option value="3">Quezon City</option>
          </select>

          <button
            type="button"
            className="btn d-flex justify-content-center btn-success text-white fw-bold col-2 align-items-center"
            style={{ height: "30px", width: "75px" }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
