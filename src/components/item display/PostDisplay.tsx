import { useAuth } from "../../AuthContext";
import { deletePaw } from "../../api";
import type { PawsListing } from "../../api";
import { logEmailCopy } from "../../api";
import { useAppStore } from "../../useAppStore";

interface PostDisplayProps {
  paw: PawsListing | null;
  onLike: (id: number) => void;
}

const PostDisplay = ({ paw, onLike }: PostDisplayProps) => {
  const { user } = useAuth();

  const isImageDisplayed = useAppStore((state) => state.isImageDisplayed);
  const setImageDisplay = useAppStore((state) => state.setImageDisplay);

  const isOwner = user && paw && Number(user.id) === Number(paw.user_id);
  const hasLiked = paw?.reactions?.some(
    (r) => Number(r.user_id) === Number(user?.id),
  );

  const handleLike = () => {
    if (isOwner) {
      alert("You cannot like your own post!");
      return;
    }
    if (paw && typeof onLike === "function") {
      onLike(paw.paws_id);
    }
  };

  const handleCopyEmail = async () => {
    if (paw?.user?.email) {
      navigator.clipboard.writeText(paw.user.email);
      alert("Email copied!");
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

      <p className="text-muted">Images</p>

      {/* Logic to display the actual images from the backend */}
      <div className="d-flex flex-row flex-wrap gap-2">
        {paw?.photos && paw.photos.length > 0 ? (
          paw.photos.map((photo) => (
            <button
              style={{ border: "none", background: "none" }}
              onClick={() => setImageDisplay(true)}
            >
              <img
                key={photo.id}
                src={photo.photo_url} // This comes from your Laravel "photo_url" accessor
                alt={paw.title}
                className="rounded"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  border: "1px solid #ddd",
                }}
              />
            </button>
          ))
        ) : (
          <p className="text-muted small">No images available for this post.</p>
        )}
      </div>

      <hr />

      <div className="d-flex flex-row justify-content-center justify-content-md-start gap-2">
        <button
          type="button"
          className="btn btn-success mt-3"
          onClick={handleCopyEmail}
        >
          Get user's email
        </button>

        <button
          type="button"
          className={`btn mt-3 ${hasLiked ? "btn-danger" : "btn-outline-danger"}`}
          onClick={handleLike}
          style={{
            cursor: isOwner ? "not-allowed" : "pointer",
            opacity: isOwner ? 0.7 : 1,
          }}
        >
          {hasLiked ? "❤️ Liked" : "🤍 Like?"} ({paw?.reactions_count || 0})
        </button>

        {isOwner && (
          <button
            type="button"
            className="btn btn-danger mt-3"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default PostDisplay;
