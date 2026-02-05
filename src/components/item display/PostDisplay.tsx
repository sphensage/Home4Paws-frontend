import { useState } from "react";
import { useAuth } from "../../AuthContext";
import { deletePaw } from "../../api";
import type { PawsListing } from "../../api";
import { logEmailCopy } from "../../api";
import { useAppStore } from "../../useAppStore";

interface PostDisplayProps {
  paw: PawsListing | null;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
}

const PostDisplay = ({ paw, onLike, onDelete }: PostDisplayProps) => {
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Auth Check
  const isAuthenticated = localStorage.getItem("auth_token") !== null;

  // Store Actions
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
    }
  };

  const handleCopyEmail = async () => {
    if (!isAuthenticated) return; 
    if (paw?.user?.email) {
      navigator.clipboard.writeText(paw.user.email);
      setSuccessMessage("Email copied to clipboard! 📋");
      if (!isOwner) {
        await logEmailCopy(paw.paws_id);
      }
    }
  };

  const handleDelete = async () => {
    if (!paw) return;
    if (window.confirm("Are you sure you want to delete this post?")) {
      const res = await deletePaw(paw.paws_id);
      if (res.success) {
        onDelete(paw.paws_id);
        setSuccessMessage("Post deleted successfully 🗑️");
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
            
            {/* Carousel for multiple images, single image display for one */}
            {hasMultipleImages ? (
              <div className="position-relative">
                <div 
                  className="position-relative rounded overflow-hidden"
                  style={{ 
                    backgroundColor: '#f8f9fa',
                    aspectRatio: '16/9'
                  }}
                >
                  {/* Image Counter */}
                  <div 
                    className="position-absolute top-0 end-0 m-3 px-3 py-1 rounded-pill"
                    style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      color: 'white',
                      fontSize: '14px',
                      zIndex: 10
                    }}
                  >
                    {currentImageIndex + 1} / {paw.photos.length}
                  </div>

                  <img
                    src={paw.photos[currentImageIndex].photo_url}
                    alt={`${paw.title} - Image ${currentImageIndex + 1}`}
                    className="w-100 h-100"
                    style={{
                      objectFit: "contain",
                      cursor: "zoom-in",
                    }}
                    onClick={() => handleImageClick(paw.photos[currentImageIndex].photo_url)}
                  />
                  
                  {/* Previous Arrow */}
                  <button
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 btn btn-light rounded-circle shadow-sm"
                    onClick={handlePrevImage}
                    style={{ 
                      width: '45px', 
                      height: '45px',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      opacity: 0.9
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                  </button>
                  
                  {/* Next Arrow */}
                  <button
                    className="position-absolute top-50 end-0 translate-middle-y me-3 btn btn-light rounded-circle shadow-sm"
                    onClick={handleNextImage}
                    style={{ 
                      width: '45px', 
                      height: '45px',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      opacity: 0.9
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
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
                      className="border-0 p-0"
                      style={{ 
                        width: index === currentImageIndex ? '24px' : '8px', 
                        height: '8px',
                        borderRadius: '4px',
                        backgroundColor: index === currentImageIndex ? '#0d6efd' : '#dee2e6',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
                
                {/* Thumbnails */}
                <div className="d-flex gap-2 mt-3 overflow-auto pb-2">
                  {paw.photos.map((photo, index) => (
                    <button
                      key={photo.id}
                      className="border-0 p-0 rounded position-relative"
                      style={{
                        minWidth: '80px',
                        outline: index === currentImageIndex ? '2px solid #0d6efd' : 'none',
                        outlineOffset: '2px',
                        opacity: index === currentImageIndex ? 1 : 0.7,
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => setCurrentImageIndex(index)}
                      onMouseEnter={(e) => !e.currentTarget.style.outline && (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={(e) => !e.currentTarget.style.outline && (e.currentTarget.style.opacity = '0.7')}
                    >
                      <img
                        src={photo.photo_url}
                        alt={`Thumbnail ${index + 1}`}
                        className="rounded"
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Single image display
              <div 
                className="rounded overflow-hidden"
                style={{ 
                  backgroundColor: '#f8f9fa',
                  aspectRatio: '16/9',
                  cursor: 'zoom-in'
                }}
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
          {/* Email Button */}
          <button
            type="button"
            className={`btn ${isAuthenticated ? 'btn-success' : 'btn-outline-secondary'} d-flex align-items-center gap-2`}
            onClick={handleCopyEmail}
            disabled={!isAuthenticated}
            style={{
              cursor: isAuthenticated ? "pointer" : "not-allowed",
            }}
          >
            <i className="bi bi-envelope"></i>
            {isAuthenticated ? "Copy Contact Email" : "Login to see email"}
          </button>

          {/* Like Button */}
          <button
            type="button"
            className={`btn d-flex align-items-center gap-2 ${
              hasLiked ? "btn-danger" : "btn-outline-danger"
            }`}
            onClick={handleLike}
            disabled={(!isAuthenticated || isOwner) ? true : false}
            style={{
              cursor: (isAuthenticated && !isOwner) ? "pointer" : "not-allowed",
              opacity: (isAuthenticated && !isOwner) ? 1 : 0.6,
            }}
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