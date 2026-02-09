import { useEffect } from "react";
import HomePageNavbar from "../forms/new/HomePageNavbar";
import HomePageContents from "../forms/new/HomePageContents";
import { SuccessToast } from "../SuccessToast";
import { useAppStore } from "../useAppStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const activeTab = useAppStore((state) => state.activeTab);
  const fetchInbox = useAppStore((state) => state.fetchInboxNotifications);
  const fetchHomePaws = useAppStore((state) => state.fetchHomePaws);
  const checkAuthStatus = useAppStore((state) => state.checkAuthStatus);
  const searchQuery = useAppStore((state) => state.searchQuery);
  const selectedCity = useAppStore((state) => state.selectedCity);

  const isImageDisplayed = useAppStore((state) => state.isImageDisplayed);
  const setImageDisplay = useAppStore((state) => state.setImageDisplay);

  // Carousel-related state
  const selectedImageUrl = useAppStore((state) => state.selectedImageUrl);
  const nextImage = useAppStore((state) => state.nextImage);
  const prevImage = useAppStore((state) => state.prevImage);
  const activePaw = useAppStore((state) => state.activePaw);

  // 1. Check auth once on mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // 2. Watch tab/search/city changes
  useEffect(() => {
    if (activeTab === "inbox") {
      fetchInbox();
    } else if (
      activeTab === "home" ||
      activeTab === "featured" ||
      activeTab === "trending" ||
      activeTab === "your_posts"
    ) {
      const delayDebounceFn = setTimeout(() => {
        fetchHomePaws(1);
      }, 400);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [activeTab, searchQuery, selectedCity, fetchHomePaws, fetchInbox]);

  return (
    <>
      <SuccessToast />
      <HomePageNavbar />
      <HomePageContents />

      {isImageDisplayed && (
        <div
          className="modal-fade-in"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 9999,
          }}
          onClick={() => setImageDisplay(false)}
        >
          {/* Previous Button */}
          {activePaw && activePaw.photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              style={{
                position: "absolute",
                left: 20,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10000,
                fontSize: "2rem",
                color: "white",
                background: "transparent",
                border: "none",
                width: "50px",
                height: "50px",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          )}

          {/* FIXED IMAGE CONTAINER */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "800px",
              height: "500px",
              maxWidth: "90vw",
              maxHeight: "80vh",
              backgroundColor: "#000",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <img
              src={selectedImageUrl || "placeholder.jpg"}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Next Button */}
          {activePaw && activePaw.photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              style={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10000,
                fontSize: "2rem",
                color: "white",
                background: "transparent",
                border: "none",
                width: "50px",
                height: "50px",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
