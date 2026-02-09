import React from "react";
import EditPostForm from "../forms/new/EditPostForm";
import "/src/stylesheets/new/homepage_new.css";
import { useAppStore } from "../useAppStore"; // Import the store

const HomePageEditPost = () => {
   const activePaw = useAppStore((state) => state.activePaw);
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row justify-content-between align-items-start">
        <div className="txt-main-label fw-bold fs-4">  Editing: <span className="text-info">{activePaw?.title || "Post"}</span></div>
      </div>
      <EditPostForm />
    </div>
  );
};

export default HomePageEditPost;
