import { useState } from "react";
import { useAuth } from "../../AuthContext";
import { deletePaw } from "../../api";
import type { PawsListing } from "../../api";
import { logFacebookVisit } from "../../api";
import { useAppStore } from "../../useAppStore";
import { markAsAdopted } from "../../api";
import "/src/stylesheets/postdisplay.css";
interface PostDisplayProps {
  paw: PawsListing | null;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
}

const PostDisplay = ({ paw, onLike, onDelete }: PostDisplayProps) => {
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const isAuthenticated = localStorage.getItem("auth_token") !== null;

  const setImageDisplay = useAppStore((state) => state.setImageDisplay);
  const setSelectedImageUrl = useAppStore((state) => state.setSelectedImageUrl);
  const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);

  const isOwner = user && paw && Number(user.id) === Number(paw.user_id);
  const hasLiked = paw?.reactions?.some(
    (r) => Number(r.user_id) === Number(user?.id),
  );

  const handleLike = () => {
    if (!isAuthenticated || isOwner) return;
    if (paw && typeof onLike === "function") {
      onLike(paw.paws_id);
      setSuccessMessage("Liked successfully ");
    }
  };

  const handleMarkAdopted = async () => {
    if (paw?.paws_id && window.confirm("Is this pet adopted?")) {
      const res = await markAsAdopted(paw.paws_id);
      if (res.success) {
        setSuccessMessage("Status updated! 🎉");
      }
    }
  }

  const handleFacebookContact = async () => {
  if (!paw?.fb_link) return;

  // 1. Open the link immediately for the best user experience
  window.open(paw.fb_link, "_blank", "noopener,noreferrer");

  // 2. Log it using our new API function
    await logFacebookVisit(paw.paws_id);
};

  const handleDelete = async () => {
    if (!paw) return;
    if (window.confirm("Are you sure you want to delete this post?")) {
      const res = await deletePaw(paw.paws_id);
      if (res.success) {
        onDelete(paw.paws_id);
        setSuccessMessage("Post deleted successfully");
      }
    }
  };

  const handleImageClick = (url: string) => {
    setSelectedImageUrl(url);
    setImageDisplay(true);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (paw?.photos && paw.photos.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? paw.photos.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (paw?.photos && paw.photos.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === paw.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const hasMultipleImages = paw?.photos && paw.photos.length > 1;

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        {/* Header Section */}
        <div className="mb-4">
          <h3 className="fw-bold mb-2">
            {paw?.title || "Post Name"}
          </h3>
          <div className="d-flex align-items-center gap-3 text-muted">
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-person-circle"></i>
              {paw?.user?.name || "username"}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-geo-alt"></i>
              {paw?.location || "Unknown location"}
            </span>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-4">
          <p className="fs-5 text-body">
            {paw?.description || "No description available."}
          </p>
        </div>

        {/* Images Section */}
        {paw?.photos && paw.photos.length > 0 && (
          <div className="mb-4">
            <h6 className="text-muted mb-3">Photos</h6>
            
            {hasMultipleImages ? (
              <div className="position-relative">
                <div className="post-display__carousel">
                  {/* Image Counter */}
                  <div className="post-display__image-counter">
                    {currentImageIndex + 1} / {paw.photos.length}
                  </div>

                  <img
                    src={paw.photos[currentImageIndex].photo_url}
                    alt={`${paw.title} - Image ${currentImageIndex + 1}`}
                    className="post-display__carousel-image"
                    onClick={() => handleImageClick(paw.photos[currentImageIndex].photo_url)}
                  />
                  
                  {/* Previous Arrow */}
                  <button
                    className="post-display__nav-button post-display__nav-button--prev"
                    onClick={handlePrevImage}
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                  </button>
                  
                  {/* Next Arrow */}
                  <button
                    className="post-display__nav-button post-display__nav-button--next"
                    onClick={handleNextImage}
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                </div>
                
                {/* Image Indicators */}
                <div className="d-flex justify-content-center gap-2 mt-3">
                  {paw.photos.map((_, index) => (
                    <button
                      key={index}
                      className={`post-display__indicator ${index === currentImageIndex ? 'post-display__indicator--active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
                
                {/* Thumbnails */}
                <div className="post-display__thumbnails">
                  {paw.photos.map((photo, index) => (
                    <button
                      key={photo.id}
                      className={`post-display__thumbnail ${index === currentImageIndex ? 'post-display__thumbnail--active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={photo.photo_url}
                        alt={`Thumbnail ${index + 1}`}
                        className="post-display__thumbnail-image"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div 
                className="post-display__single-image"
                onClick={() => handleImageClick(paw.photos[0].photo_url)}
              >
                <img
                  src={paw.photos[0].photo_url}
                  alt={paw.title}
                  className="w-100 h-100"
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
          </div>
        )}

        {(!paw?.photos || paw.photos.length === 0) && (
          <div className="bg-light rounded p-4 mb-4 text-center">
            <i className="bi bi-image text-muted fs-1"></i>
            <p className="text-muted mt-2">No images available for this post</p>
          </div>
        )}

        <hr className="my-4" />

        {/* Action Buttons */}
        <div className="d-flex flex-wrap gap-2">
           {/* Facebook Contact Button (Replaces Email) */}
          <button
            type="button"
            className={`btn ${isAuthenticated && paw?.fb_link ? 'btn-primary' : 'btn-outline-secondary'} d-flex align-items-center gap-2 ${(!isAuthenticated || !paw?.fb_link || paw?.status === 'adopted') ? 'post-display__disabled' : ''}`}
            onClick={handleFacebookContact}
            disabled={!isAuthenticated || !paw?.fb_link || paw?.status === 'adopted'}
            style={isAuthenticated && paw?.fb_link && paw?.status !== 'adopted' ? { backgroundColor: '#1877F2', borderColor: '#1877F2' } : {}}
          >
            <i className="bi bi-facebook"></i>
            {!isAuthenticated 
              ? "Login to Contact" 
              : paw?.status === 'adopted' 
                ? "Pet Adopted" 
                : "Contact on Facebook"}
          </button>

          
          {/* NEW: Mark Adopted Button (Visible only to owner if pet is still available) */}
          {isOwner && paw?.status !== 'adopted' && (
            <button
              type="button"
              className="btn btn-success d-flex align-items-center gap-2"
              onClick={handleMarkAdopted}
            >
              <i className="bi bi-house-heart"></i>
              Mark as Adopted
            </button>
          )}

                  {/* Like Button */}
                  <button
                    type="button"
                    className={`btn d-flex align-items-center gap-2 ${
                      hasLiked ? "btn-danger" : "btn-outline-danger"
                    } ${(!isAuthenticated || isOwner) ? 'post-display__disabled-like' : ''}`}
                    onClick={handleLike}
                    disabled={(!isAuthenticated || isOwner) ? true : false}
                  >
                    <i className={`bi ${hasLiked ? '❤️' : '🩶'}`}></i>
                    <span>{hasLiked ? "❤️ Liked" : "❤️ Like"}</span>
                    <span className="badge bg-white text-danger">
                      {paw?.reactions_count || 0}
                    </span>
                  </button>

          {/* Delete Button (Owner Only) */}
          {isOwner && (
            <button
              type="button"
              className="btn btn-outline-danger d-flex align-items-center gap-2 ms-auto"
              onClick={handleDelete}
            >
              <i className="bi bi-trash"></i>
              Delete Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDisplay;