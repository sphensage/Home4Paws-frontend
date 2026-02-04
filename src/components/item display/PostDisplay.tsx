import { useAuth } from "../../AuthContext";
import { deletePaw } from "../../api";
import type { PawsListing } from "../../api";
import { logEmailCopy } from "../../api";
import { useAppStore } from "../../useAppStore"; // Import store

interface PostDisplayProps {
  paw: PawsListing | null;
  onLike: (id: number) => void;
}

const PostDisplay = ({ paw, onLike }: PostDisplayProps) => {
  const { user } = useAuth();

  // 1. Get the setter for the URL
  const setImageDisplay = useAppStore((state) => state.setImageDisplay);
  const setSelectedImageUrl = useAppStore((state) => state.setSelectedImageUrl);

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

  // 2. Create a handler to set the URL and Open the modal
  const handleImageClick = (url: string) => {
    setSelectedImageUrl(url); // Set the specific image URL
    setImageDisplay(true);    // Open the overlay
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

      <div className="d-flex flex-row flex-wrap gap-2">
        {paw?.photos && paw.photos.length > 0 ? (
          paw.photos.map((photo) => (
            <button
              key={photo.id} // moved key here
              style={{ border: "none", background: "none", padding: 0 }}
              // 3. Update the click event here
              onClick={() => handleImageClick(photo.photo_url)}
            >
              <img
                src={photo.photo_url}
                alt={paw.title}
                className="rounded"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  border: "1px solid #ddd",
                  cursor: "zoom-in"
                }}
              />
            </button>
          ))
        ) : (
          <p className="text-muted small">No images available for this post.</p>
        )}
      </div>

      <hr />
      
      {/* Rest of your buttons (Like, Delete, etc.) */}
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