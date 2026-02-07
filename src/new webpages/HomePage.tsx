import { useEffect } from "react";
import HomePageNavbar from "../forms/new/HomePageNavbar";
import HomePageContents from "../forms/new/HomePageContents";
import { SuccessToast } from "../SuccessToast";
import { useAppStore } from "../useAppStore";

const HomePage = () => {
  const activeTab = useAppStore((state) => state.activeTab);
  const fetchInbox = useAppStore((state) => state.fetchInboxNotifications);
  const fetchHomePaws = useAppStore((state) => state.fetchHomePaws);
  const checkAuthStatus = useAppStore((state) => state.checkAuthStatus);
  const searchQuery = useAppStore((state) => state.searchQuery);
  const selectedCity = useAppStore((state) => state.selectedCity);
  const isImageDisplayed = useAppStore((state) => state.isImageDisplayed);
  const setImageDisplay = useAppStore((state) => state.setImageDisplay);

  // 1. Check Auth once on mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // 2. Combined Watcher for Tab Switching and Searching
  useEffect(() => {
    if (activeTab === "inbox") {
      // Fetch inbox immediately when tab is switched to inbox
      fetchInbox();
    } else if (
      activeTab === "home" ||
      activeTab === "featured" ||
      activeTab === "trending"
    ) {
      // Debounce the pet fetching for home/featured/trending tabs
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
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark backdrop
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 9999, // Higher than other content
          }}
          onClick={() => setImageDisplay(false)} // Close when clicking backdrop
        >
          {/* Stop click propagation so clicking the content doesn't close it */}
          <div
            className="d-flex align-items-center justify-content-center"
            onClick={() => setImageDisplay(false)}
          >
            <img
              src="Home4Paws-frontend\src\assets\pet_img4.jpg"
              alt="Preview"
              style={{ maxWidth: "80%", maxHeight: "80%" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
