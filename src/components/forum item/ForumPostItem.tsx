import React from "react";
import type { PawsListing } from "../../api";

interface ForumPostItemProps {
  paw?: PawsListing;
  // Note: we removed onLike here because liking only happens in the modal now
  setShowPostItemModal: (show: boolean) => void;
  currentUserId?: number;
}

const ForumPostItem = ({
  paw,
  setShowPostItemModal,
  currentUserId,
}: ForumPostItemProps) => {

  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    if (!dateString) return "";
    const postDate = new Date(dateString);
    const diff = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return postDate.toLocaleDateString();
  };

  // Logic for display only: Red if liked, Gray if not
  const hasLiked = paw?.reactions?.some(r => r.user_id === currentUserId);

  if (!paw) {
    return (
      <button className="d-flex flex-row justify-content-between align-items-center w-100 flex-shrink-0 placeholder-glow" style={{ border: "none", backgroundColor: "white", borderRadius: "7px", height: "4.5rem" }}>
        <div className="col-6 d-flex flex-row justify-content-start align-items-center">
          <div className="d-flex ms-4 placeholder bg-dark" style={{ width: "35px", height: "35px", borderRadius: "50%" }} />
          <div className="mx-3 col-6 text-start">Loading...</div>
        </div>
      </button>
    );
  }

  return (
    <button
      className="d-flex flex-row justify-content-between align-items-center w-100 flex-shrink-0"
      style={{ border: "none", backgroundColor: "white", borderRadius: "7px", height: "4.5rem" }}
      // Clicking ANYWHERE on this button opens the modal
      onClick={() => setShowPostItemModal(true)}
    >
      <div className="col-6 d-flex flex-row justify-content-start align-items-center">
        <div className="d-flex ms-4 bg-dark" style={{ width: "35px", height: "35px", borderRadius: "50%" }} />
        <div className="mx-3 col-6 text-start text-truncate fw-bold">{paw.title}</div>
      </div>
      <div className="d-flex flex-row col-6 justify-content-around align-items-center text-muted">
        <div className="mx-3 col-6 text-end">{getRelativeTime(paw.created_at)}</div>
        
        {/* Visual-only heart: This no longer has its own onClick */}
        <div 
          className="mx-3 col-3 d-flex align-items-center justify-content-center"
          style={{ gap: '5px' }}
        >
          <span style={{ 
            filter: hasLiked ? 'none' : 'grayscale(100%) opacity(0.5)', 
            transition: '0.2s' 
          }}>
            ❤️
          </span>
          <span style={{ color: hasLiked ? '#dc3545' : 'inherit' }}>
            {paw.reactions_count || 0}
          </span>
        </div>
      </div>
      
    </button>
  );
};

export default ForumPostItem;
