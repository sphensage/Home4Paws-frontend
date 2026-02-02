// import React from "react";
import ForumInboxHeader from "../../forms/ForumInboxHeader";
import ForumInboxItem from "../forum item/ForumInboxItem";

const ForumInbox = () => {
  return (
    <div style={{ height: "100%" }}>
      <ForumInboxHeader />
      <div
        id="inboxesContainer"
        className="d-flex flex-column w-100 mt-4 gap-3"
        style={{
          overflowY: "auto",
          // backgroundColor: "black",
          height: "370px",
        }}
      >
        {/* For placeholder, e.g. if the page is loading */}
        <ForumInboxItem />
        <ForumInboxItem />
        <ForumInboxItem />
        <ForumInboxItem />
      </div>
    </div>
  );
};

export default ForumInbox;
