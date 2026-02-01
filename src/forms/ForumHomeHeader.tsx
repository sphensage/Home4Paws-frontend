// import React from "react";

const ForumHomeHeader = () => {
  return (
    <div
      className="d-flex flex-row align-items-center w-100 py-3"
      style={{ backgroundColor: "#8b2e58", borderRadius: "7px" }}
    >
      <div className="text-white col-7 ps-4">
        <p className="mb-0">Posts</p>
      </div>
      <div className="text-white col-3">
        <p className="mb-0"> Since posted</p>
      </div>
      <div className="text-white col-3">
        <p className="mb-0">Likes</p>
      </div>
    </div>
  );
};

export default ForumHomeHeader;
