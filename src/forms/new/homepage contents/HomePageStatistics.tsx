import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "/src/stylesheets/new/homepage_new.css";
import { faComments, faPaw, faUser } from "@fortawesome/free-solid-svg-icons";

const HomePageStatistics = () => {
  return (
    <div className="hm-stats" style={{ width: "40vh" }}>
      <div
        className="hm-stats d-flex flex-column px-4 pt-3"
        style={{ width: "40vh" }}
      >
        <p className="txt-main-label fw-bold fs-5 mb-4">Statistics</p>
        <div className="d-flex flex-row justify-content-start mb-4 gap-3 align-items-center">
          <FontAwesomeIcon icon={faComments} size="2x" />
          <div className="d-flex flex-column justify-content-start align-items-start">
            <p className="mb-0 fw-bold">20</p>
            <p className="mb-0 txt-muted">Total posts</p>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-start gap-3 align-items-center">
          <FontAwesomeIcon icon={faPaw} size="2x" />
          <div className="d-flex flex-column justify-content-start align-items-start">
            <p className="mb-0 fw-bold">2</p>
            <p className="mb-0 txt-muted">Total users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageStatistics;
