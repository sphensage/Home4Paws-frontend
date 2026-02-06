import React from "react";

const ViewPost = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="txt-main-label fw-bold fs-4">View Post</div>
      </div>
      <div
        className="p-3 w-100 d-flex flex-column gap-3 justify-content-start align-items-start hm-content"
        style={{ height: "60vh", minHeight: "60vh", overflowY: "scroll" }}
      >
        <div className="d-flex flex-row gap-3 fw-bold align-items-center">
        POST TITLE HERE
        <div className="fw-normal post-user" style={{ fontSize: "15px" }}>
          <FontAwesomeIcon icon={faUser} size="xs" className="me-2" />
          USERNAME
        </div>
          <span
            className="badge text-bg-warning text-white"
            style={{ fontSize: "10px" }}
          >
            Adopted
          </span>
          <span
            className="badge text-bg-success text-white"
            style={{ fontSize: "10px" }}
          >
            Open
          </span>
      </div>
      </div>
    </div>
  );
};

export default ViewPost;
