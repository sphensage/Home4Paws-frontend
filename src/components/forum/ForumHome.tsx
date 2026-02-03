import React, { useEffect, useState } from "react"; // Added useEffect & useState

import ForumHomeHeader from "../../forms/ForumHomeHeader";
import ForumPostItem from "../forum item/ForumPostItem";
import { getPaws, type PawsListing } from "../../api"; // Ensure this path is correct

interface ForumHomeProps {
  showPostItemModal: boolean;
  setShowPostItemModal: (show: boolean) => void;
  setActivePaw: (paw: PawsListing) => void; 
}

const ForumHome = ({
  showPostItemModal,
  setShowPostItemModal,
  setActivePaw,
}: ForumHomeProps) => {
  // 1. Create state to hold your posts
  const [paws, setPaws] = useState<PawsListing[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getPaws();
      if (result.success && result.paws) {
        setPaws(result.paws);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <ForumHomeHeader />
      <div
        id="postsContainer"
        className="d-flex flex-column w-100 mt-4 gap-3"
        style={{
          overflowY: "auto",
          height: "370px",
        }}
      >
        {/* 3. Logic to show either data or placeholders */}
        {loading ? (
          // Show 3 placeholders while loading
          <>
            <ForumPostItem showPostItemModal={false} setShowPostItemModal={() => {}} />
            <ForumPostItem showPostItemModal={false} setShowPostItemModal={() => {}} />
            <ForumPostItem showPostItemModal={false} setShowPostItemModal={() => {}} />
          </>
        ) : paws.length > 0 ? (
          // 4. Map through real database items
          paws.map((paw) => (
            <ForumPostItem
              key={paw.id}
              paw={paw} // Passing the real data here
              showPostItemModal={showPostItemModal}
              setShowPostItemModal={(show) => {
                if (show) {
                  setActivePaw(paw);
                } 
                setShowPostItemModal(show);
              }}
            />
          ))
        ) : (
          <div className="text-center text-muted mt-5">No posts yet. Be the first to post!</div>
        )}
      </div>
    </div>
  );
};

export default ForumHome;
