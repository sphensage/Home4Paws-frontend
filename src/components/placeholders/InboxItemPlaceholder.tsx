// import React from 'react'

const InboxItemPlaceholder = () => {
  return (
    // PLACEHOLDER CARD, use typescript to actually display the items !!!
    <div
      id="inboxItem"
      className="d-flex flex-row justify-content-between align-items-center w-100 flex-shrink-0 placeholder-glow"
      style={{
        border: "none",
        backgroundColor: "white",
        borderRadius: "7px",
        height: "4.5rem",
      }}
    >
      <div className="col-9 d-flex flex-row justify-content-start align-items-center">
        <div
          id="profileIconBox"
          className="d-flex ms-4 justify-content-center align-items-center placeholder bg-dark"
          style={{ backgroundColor: "white", width: "35px", height: "35px" }}
        />
        <div
          id="inboxDescription"
          className="mx-3 col-8 placeholder bg-dark"
        ></div>
      </div>
    </div>
  );
};

export default InboxItemPlaceholder;
