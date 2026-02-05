import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

const InboxItemInteract = () => {
  return (
    <button className="btn-invisible w-100 post-bg d-flex flex-column fs-5 p-3 justify-content-start align-items-start">
      <div
        id="inboxContent"
        className="w-100 d-flex flex-row gap-2 fw-normal justify-content-between align-items-center"
        style={{ fontSize: "15px" }}
      >
        <div id="inboxTitle">
          <span className="txt-secondary fw-bold">Username Lastname </span>
          interacted with your contacts!
        </div>
        <div id="inboxDate" className="txt-muted" style={{ fontSize: "11px" }}>
          <FontAwesomeIcon icon={faClockRotateLeft} /> 5 days ago
        </div>
      </div>
    </button>
  );
};

export default InboxItemInteract;
