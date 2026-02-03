// import React from "react";
import ForumInboxHeader from "../../forms/ForumInboxHeader";
import ListPlaceholder from "../placeholders/ListPlaceholder";

const ForumInbox = () => {
  return (
    <div style={{ height: "100%" }}>
      <ForumInboxHeader />
      {/* <div
        id="inboxesContainer"
        className="d-flex flex-column w-100 mt-4 gap-3"
        style={{
          overflowY: "auto",
          // backgroundColor: "black",
          height: "370px",
        }}
      >
      </div> */}

      {/* Disable this if page has been loaded */}
      <ListPlaceholder type="inbox" />
    </div>
  );
};

export default ForumInbox;
