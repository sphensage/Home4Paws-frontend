import { useState } from "react";
import ForumInbox from "./ForumInbox";
import ForumHome from "./ForumHome";
import type { PawsListing } from "../../api";
import { getUnreadCount } from "../../api";
import { useEffect } from "react";
import { useAppStore } from "../../useAppStore";

interface ForumContentsProps {
  onVariantChange?: (variant: "home" | "inbox") => void;
  showCreateModal: boolean;
  setShowCreateModal: (show: boolean) => void;
  showPostItemModal: boolean;
  setShowPostItemModal: (show: boolean) => void;
  setActivePaw: (paw: PawsListing | null) => void;
  // FINAL WIRING:
  paws: PawsListing[];
  loading: boolean;
  // Add these to both HomePageForumProps and ForumContentsProps
}

const ForumContents = ({
  onVariantChange,
  setShowCreateModal,
  showPostItemModal,
  setShowPostItemModal,
  setActivePaw,
  paws, // Received from HomePageForum
  loading,
}: ForumContentsProps) => {
  const [active, setActive] = useState<"home" | "inbox">("home");
  const [unreadCount, setUnreadCount] = useState(0);
  const isAuthenticated = !!localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchUnread = async () => {
      const res = await getUnreadCount();
      if (res.success) {
        setUnreadCount(res.count ?? 0);
      }
    };

    fetchUnread();

    // Optional: Refresh count every 30 seconds
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, []);
  const activeColorFilter =
    "brightness(0) saturate(100%) invert(25%) sepia(21%) saturate(2537%) hue-rotate(287deg) brightness(94%) contrast(94%)";
  const inactiveColorFilter = "brightness(0) saturate(100%)";

  const handleActiveChange = (newActive: "home" | "inbox") => {
    setActive(newActive);
    onVariantChange?.(newActive);

    if (newActive === "inbox") {
      setUnreadCount(0);
    }
  };

  return (
    <div
      className="mt-3 d-flex flex-column flex-md-row w-100 gap-3"
      style={{ height: "calc(100% - 80px)" }}
    >
      <div
        id="sidebar"
        className="h-100 p-3"
        style={{ backgroundColor: "white", borderRadius: "7px", flex: "3" }}
      >
        {/* ... (Keep your sidebar Home/Inbox buttons exactly as they are) ... */}
        <div className="d-flex flex-row justify-content-around align-items-center w-100 mb-2">
          <img
            src="/src/assets/home_icon.svg"
            className="me-2"
            alt="logo"
            style={{
              filter:
                active === "home" ? activeColorFilter : inactiveColorFilter,
              transition: "filter 0.3s",
            }}
          />
          <button
            type="button"
            className="w-100 text-start fw-bold ps-3"
            style={{
              backgroundColor: active === "home" ? "#f1d6e2" : "#ffffff",
              color: active === "home" ? "#8b2e58" : "black",
              border: "none",
              borderRadius: "6px",
              height: "3.25rem",
            }}
            onClick={() => handleActiveChange("home")}
          >
            Home
          </button>
        </div>
        
        <div className="d-flex flex-row justify-content-around align-items-center w-100">
          <img
            src="/src/assets/inbox_icon.svg"
            className="me-2"
            alt="logo"
            style={{
              filter: active === "inbox" ? activeColorFilter : inactiveColorFilter,
              transition: "filter 0.3s",
              opacity: isAuthenticated ? 1 : 0.5, // Fades icon if locked
            }}
          />
          <button
            type="button"
            className="w-100 text-start fw-bold ps-3"
            // 2. Disable logic: stops clicks and keyboard interaction
            disabled={!isAuthenticated} 
            style={{
              backgroundColor: active === "inbox" ? "#f1d6e2" : "#ffffff",
              color: active === "inbox" ? "#8b2e58" : "black",
              border: "none",
              borderRadius: "6px",
              height: "3.25rem",
              // 3. Style logic: provides visual "locked" feedback
              cursor: isAuthenticated ? "pointer" : "not-allowed",
              opacity: isAuthenticated ? 1 : 0.6,
            }}
            onClick={() => handleActiveChange("inbox")}
          >
            <div className="d-flex d-row justify-content-between">
              Inbox
              {/* Only show unread count if user is logged in */}
              {unreadCount > 0 && isAuthenticated && (
                <span
                  className="text-white text-center"
                  style={{
                    backgroundColor: "#8b2e58",
                    borderRadius: "8px",
                    width: "30px",
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </div>
          </button>
        </div>

        <button
          type="button"
          className="btn btn-primary w-100"
          style={{
            backgroundColor: "#8B2E58",
            border: "none",
            marginTop: "20px",
          }}
          onClick={() => setShowCreateModal(true)}
        >
          <div
            className="d-flex flex-row align-items-center justify-content-between px-3"
            style={{ height: "2.25rem" }}
          >
            Create new post
            <img src="/src/assets/create_post_icon.svg" alt="create post" />
          </div>
        </button>
      </div>

      <div
        className="h-100"
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          borderRadius: "7px",
          flex: "9",
        }}
      >
        {active === "home" && (
          <div style={{ height: "100%" }}>
            {/* THE FINAL DESTINATION FOR THE PROPS: */}
            <ForumHome
              setShowPostItemModal={setShowPostItemModal}
              setActivePaw={setActivePaw}
              paws={paws}
              loading={loading}
            />
          </div>
        )}

        {active === "inbox" && (
          <div>
            <ForumInbox />
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumContents;
