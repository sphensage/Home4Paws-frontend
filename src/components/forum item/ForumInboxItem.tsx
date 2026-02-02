// import React from 'react'

const ForumInboxItem = () => {
  return (
    // PLACEHOLDER CARD, use typescript to actually display the items !!!
    <button
      id="inboxItem"
      className="d-flex flex-row justify-content-between align-items-center w-100 flex-shrink-0 placeholder-glow"
      style={{
        border: "none",
        backgroundColor: "white",
        borderRadius: "7px",
        height: "4.5rem",
      }}
    >
      <div className="col-3">
        <div
          id="profileIconBox"
          className="d-flex ms-4 justify-content-center align-items-center placeholder bg-dark"
          style={{ backgroundColor: "white", width: "35px", height: "35px" }}
        />
      </div>
      <div className="d-flex flex-row justify-content-end me-4 w-100">
        <div id="inboxDescription" className="col-8 placeholder bg-dark" />
      </div>
    </button>
  );
};

export default ForumInboxItem;
