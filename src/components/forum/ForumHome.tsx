import React from "react";
import ForumHomeHeader from "../../forms/ForumHomeHeader";
import ForumPostItem from "../forum item/ForumPostItem";
import { type PawsListing } from "../../api"; 
import { useAuth } from "../../AuthContext";

interface ForumHomeProps {
  // REMOVE showPostItemModal - it's unused here
  setShowPostItemModal: (show: boolean) => void;
  setActivePaw: (paw: PawsListing) => void; 
  paws: PawsListing[]; // ADD THIS: Coming from HomePage
  loading: boolean;    // ADD THIS: Coming from HomePage
}

const ForumHome = ({
  setShowPostItemModal,
  setActivePaw,
  paws,    // Received as prop
  loading, // Received as prop
}: ForumHomeProps) => {
  const { user } = useAuth(); 

  // NOTE: useEffect and local paws state ARE GONE. 
  // This component now just displays what the Parent gives it.

  return (
    <div style={{ height: "100%" }}>
      <ForumHomeHeader />
      <div id="postsContainer" className="d-flex flex-column w-100 mt-4 gap-3" style={{ overflowY: "auto", height: "370px" }}>
        {loading ? (
          <div className="text-center mt-5">Loading posts...</div>
        ) : paws.length > 0 ? (
          paws.map((paw) => (
            <ForumPostItem
              key={paw.paws_id}
              paw={paw}
              currentUserId={user?.id}
              setShowPostItemModal={(show) => {
                if (show) setActivePaw(paw);
                setShowPostItemModal(show);
              }}
            />
          ))
        ) : (
          <div className="text-center text-muted mt-5">No posts yet.</div>
        )}
      </div>
    </div>
  );
};

export default ForumHome;
