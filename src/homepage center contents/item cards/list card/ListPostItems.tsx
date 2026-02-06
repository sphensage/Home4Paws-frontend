import React from "react";
import { PostItem } from "../PostItem";
import { useAppStore } from "../../../useAppStore"; // Adjust the path as necessary

const ListPostItems = () => {
  // Get the list of pets and the loading status from the store
  const paws = useAppStore(state => state.paws);
  const loading = useAppStore(state => state.loading);

  if (loading) {
    // Basic loading indicator using standard Bootstrap spinner
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "75vh" }}>
        <div className="spinner-border text-white" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (paws.length === 0) {
      return (
          <div className="text-center mt-5">
              No posts found matching your criteria.
          </div>
      );
  }

  return (
    <div
      className="d-flex flex-column gap-2"
      style={{ height: "75vh", minHeight: "75vh", overflowY: "auto" }}
    >
      {/* Map over the actual data and pass each pet object to the PostItem component */}
      {paws.map((paw) => (
        <PostItem key={paw.paws_id} paw={paw} />
      ))}
    </div>
  );
};

export default ListPostItems;
