// import React from "react";

import ForumHomeHeader from "../../forms/ForumHomeHeader";
import ForumPostItem from "../forum item/ForumPostItem";

const ForumHome = () => {
  return (
    <div style={{ height: "100%" }}>
      <ForumHomeHeader />
      <div
        id="postsContainer"
        className="d-flex flex-column w-100 mt-4 gap-3"
        style={{
          overflowY: "auto",
          // backgroundColor: "black",
          height: "385px",
        }}
      >
        {/* For placeholder, e.g. if the page is loading */}
        <ForumPostItem />
        <ForumPostItem />
        <ForumPostItem />
        <ForumPostItem />
      </div>
    </div>
  );
};

export default ForumHome;
