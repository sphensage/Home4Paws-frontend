import React from "react";
import { useAppStore } from "../../useAppStore";

const ImageDisplay = () => {
  const isImageDisplayed = useAppStore((state) => state.isImageDisplayed);
  const setImageDisplay = useAppStore((state) => state.setImageDisplay);
  const selectedImageUrl = useAppStore((state) => state.selectedImageUrl);

  // If the store says don't show, return nothing
  if (!isImageDisplayed || !selectedImageUrl) return null;

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ 
        backgroundColor: "rgba(0,0,0,0.85)", 
        zIndex: 10000,
        cursor: "zoom-out" 
      }}
      onClick={() => setImageDisplay(false)} // Close when clicking the dark background
    >
      <div className="position-relative">
        <img
          className="img-fluid rounded shadow-lg"
          src={selectedImageUrl}
          alt="Enlarged view"
          style={{ 
            maxHeight: "90vh", 
            maxWidth: "90vw", 
            objectFit: "contain",
            cursor: "default" 
          }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
        />
        
        {/* Close Button */}
        <button 
          className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle"
          style={{ width: "40px", height: "40px", fontWeight: "bold" }}
          onClick={() => setImageDisplay(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ImageDisplay;
