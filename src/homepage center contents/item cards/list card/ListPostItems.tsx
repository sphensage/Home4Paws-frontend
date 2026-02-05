import React from "react";
import { PostItem } from "../PostItem";

const ListPostItems = () => {
  return (
    <div
      className="d-flex flex-column gap-2"
      style={{ height: "75vh", minHeight: "75vh", overflowY: "scroll" }}
    >
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
    </div>
  );
};

export default ListPostItems;
