// import React from "react";

const ForumHomeHeader = () => {
  return (
    <div
      className="d-flex flex-row justify-content-between align-items-center w-100 py-3"
      style={{ backgroundColor: "#8b2e58", borderRadius: "7px" }}
    >
      <div className="text-white col-6 ps-4">
        <p className="mb-0">Posts</p>
      </div>
      <div className="d-flex flex-row col-6 justify-content-around">
        <div className="text-white col-3 text-center">
          <p className="mb-0">Since posted</p>
        </div>
        <div className="text-white col-3 text-center">
          <p className="mb-0">Likes</p>
        </div>
      </div>
    </div>
  );
};

export default ForumHomeHeader;
