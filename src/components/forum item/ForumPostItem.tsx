import type { PawsListing } from "../../api";

interface ForumPostItemProps {
  paw?: PawsListing;
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

  const hasLiked = paw?.reactions?.some(r => r.user_id === currentUserId);

  if (!paw) {
    return (
      <button className="d-flex flex-row align-items-center w-100 flex-shrink-0 placeholder-glow" style={{ border: "none", backgroundColor: "white", borderRadius: "7px", height: "4.5rem" }}>
        <div className="col-6 d-flex flex-row justify-content-start align-items-center ps-4">
          <div className="placeholder bg-dark" style={{ width: "35px", height: "35px", borderRadius: "50%" }} />
          <div className="mx-3 text-start">Loading...</div>
        </div>
      </button>
    );
  }

  return (
    <button
      className="d-flex flex-row align-items-center w-100 flex-shrink-0 mb-1"
      style={{ border: "none", backgroundColor: "white", borderRadius: "7px", height: "4.5rem" }}
      onClick={() => setShowPostItemModal(true)}
    >
      {/* Left Section - EXACT 50% (col-6) */}
      <div className="col-6 ps-4 d-flex flex-row justify-content-start align-items-center">
        <div className="mx-3 text-start text-truncate fw-bold text-dark">{paw.title}</div>
      </div>

      {/* Right Section - EXACT 50% (col-6) to match Header */}
      <div className="col-6 d-flex flex-row justify-content-around align-items-center">
        {/* Mirroring Code 3: col-3 text-center */}
        <div className="col-3 text-center text-muted">
          <p className="mb-0" style={{ fontSize: "0.9rem" }}>{getRelativeTime(paw.created_at)}</p>
        </div>
        
        {/* Mirroring Code 3: col-3 text-center */}
        <div className="col-3 text-center text-muted d-flex align-items-center justify-content-center">
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ 
              filter: hasLiked ? 'none' : 'grayscale(100%) opacity(0.5)', 
              transition: '0.2s' 
            }}>
              ❤️
            </span>
            <span>{paw.reactions_count || 0}</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ForumPostItem;
