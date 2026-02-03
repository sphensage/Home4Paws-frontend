// import React from "react";

import ForumHomeHeader from "../../forms/ForumHomeHeader";
import ForumPostItem from "../forum item/ForumPostItem";
import ListPlaceholder from "../placeholders/ListPlaceholder";

interface ForumHomeProps {
  showPostItemModal: boolean;
  setShowPostItemModal: (show: boolean) => void;
}

const ForumHome = ({
  showPostItemModal,
  setShowPostItemModal,
}: ForumHomeProps) => {
  return (
    <div style={{ height: "100%" }}>
      <ForumHomeHeader />
      <div
        id="postsContainer"
        className="d-flex flex-column w-100 mt-4 gap-3"
        style={{
          overflowY: "auto",
          // backgroundColor: "black",
          height: "370px",
        }}
      >
        <ForumPostItem
          showPostItemModal={showPostItemModal}
          setShowPostItemModal={setShowPostItemModal}
        />
        <ForumPostItem
          showPostItemModal={showPostItemModal}
          setShowPostItemModal={setShowPostItemModal}
        />
        <ForumPostItem
          showPostItemModal={showPostItemModal}
          setShowPostItemModal={setShowPostItemModal}
        />
        <ForumPostItem
          showPostItemModal={showPostItemModal}
          setShowPostItemModal={setShowPostItemModal}
        />
        <ForumPostItem
          showPostItemModal={showPostItemModal}
          setShowPostItemModal={setShowPostItemModal}
        />
        <ForumPostItem
          showPostItemModal={showPostItemModal}
          setShowPostItemModal={setShowPostItemModal}
        />
        <ForumPostItem
          showPostItemModal={showPostItemModal}
          setShowPostItemModal={setShowPostItemModal}
        />
        <ForumPostItem
          showPostItemModal={showPostItemModal}
          setShowPostItemModal={setShowPostItemModal}
        />
      </div>

      {/* Disable this if page has been loaded */}
      {/* <ListPlaceholder type="post" /> */}
    </div>
  );
};

export default ForumHome;
