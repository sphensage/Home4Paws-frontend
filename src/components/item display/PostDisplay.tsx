import { useAuth } from "../../AuthContext";
import { deletePaw } from "../../api";
import type { PawsListing } from "../../api";
import { logEmailCopy } from "../../api";

interface PostDisplayProps {
  paw: PawsListing | null;
  onLike: (id: number) => void; 
}

const PostDisplay = ({ paw, onLike }: PostDisplayProps) => {
  const { user } = useAuth();

  const isOwner = user && paw && Number(user.id) === Number(paw.user_id);
  const hasLiked = paw?.reactions?.some((r) => Number(r.user_id) === Number(user?.id));
  
  const handleLike = () => {
    // Logic: Prevent owner from liking
    if (isOwner) {
      alert("You cannot like your own post!");
      return;
    }
    if (paw && typeof onLike === 'function') {
      onLike(paw.paws_id); 
    }
  };

  const handleCopyEmail = async () => {
  if (paw?.user?.email) {
    // 1. Copy to clipboard
    navigator.clipboard.writeText(paw.user.email);
    alert("Email copied!");

    // 2. Trigger the notification in the backend
    if (!isOwner) {
      await logEmailCopy(paw.paws_id);
    }
  }
};

  const handleDelete = async () => {
    if (!paw) return;
    if (window.confirm("Are you sure?")) {
      const res = await deletePaw(paw.paws_id);
      if (res.success) window.location.reload();
    }
  };

  return (
    <div className="d-flex flex-column justify-content-start">
      <h3 className="fw-bold">
        {paw?.title || "Post Name"}
        <span className="ms-3 text-muted fs-5 fw-normal">
          post by {paw?.user?.name || "username"}
        </span>
      </h3>
      <p className="text-muted">Location: {paw?.location}</p>
      
      <p className="fs-4 mt-3">{paw?.description || "No description."}</p>

      <hr/>

      {/* Restored your original spacing and classes */}
      <div className="d-flex flex-row justify-content-center justify-content-md-start gap-2">
        <button type="button" className="btn btn-success mt-3" onClick={handleCopyEmail}>
          Get user's email
        </button>

        <button 
          type="button" 
          className={`btn mt-3 ${hasLiked ? 'btn-danger' : 'btn-outline-danger'}`} 
          onClick={handleLike}
          style={{ 
            cursor: isOwner ? "not-allowed" : "pointer",
            opacity: isOwner ? 0.7 : 1 
          }}
        >
          {hasLiked ? "❤️ Liked" : "🤍 Like?"} ({paw?.reactions_count || 0})
        </button>

        {isOwner && (
          <button type="button" className="btn btn-danger mt-3" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default PostDisplay;
