import type { PawsListing } from "../../api";

const DummyPostItem = () => {
  return (
    <button
      id="postItem"
      className="d-flex flex-row justify-content-between align-items-center w-100 flex-shrink-0"
      style={{
        border: "none",
        backgroundColor: "white",
        borderRadius: "7px",
        height: "4.5rem",
      }}
    >
      {/* Left side: Matches the col-6 and ps-4 of the header */}
      <div className="col-6 d-flex flex-row justify-content-start align-items-center ps-4">
        <div
          id="profileIconBox"
          className="d-flex justify-content-center align-items-center flex-shrink-0"
          style={{ backgroundColor: "black", width: "35px", height: "35px" }}
        >
          <img src="/src/assets/user_icon.svg" alt="user icon" />
        </div>
        <div id="postDescription" className="ms-3 fw-bold text-truncate">
          giving out free doggos =w=
        </div>
      </div>

      {/* Right side: Matches the col-6 and justify-content-around of the header */}
      <div className="d-flex flex-row col-6 justify-content-around">
        {/* Matches col-3 and text-center of the header */}
        <div id="datePosted" className="col-3 text-center mb-0">
          9 hours ago
        </div>
        {/* Matches col-3 and text-center of the header */}
        <div id="likes" className="col-3 text-center mb-0">
          8
        </div>
      </div>
    </button>
  );
};
