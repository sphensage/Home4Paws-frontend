import { useRef, useEffect } from "react";
import "/src/stylesheets/new/homepage_new.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppStore } from "../../../useAppStore";
import { useNavigate } from "react-router-dom";
import * as bootstrap from "bootstrap";
import {
  faArrowRightFromBracket,
  faBell,
  faChartColumn,
  faHouse,
  faLightbulb,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const HomePageSidebar = () => {
  const activeTab = useAppStore((state) => state.activeTab);
  const setActiveTab = useAppStore((state) => state.setActiveTab);
  const store = useAppStore();
  const navigate = useNavigate();

  const logoutBtnRef = useRef<HTMLButtonElement>(null);

  // Check if user is logged in
  const isAuthenticated = !!localStorage.getItem("auth_token");

  useEffect(() => {
    let popoverInstance: bootstrap.Popover | null = null;

    if (logoutBtnRef.current && isAuthenticated) {
      popoverInstance = new bootstrap.Popover(logoutBtnRef.current, {
        sanitize: false,
        html: true,
        trigger: "click",
        placement: "bottom",
        customClass: "custom-popover",
        content: `
          <div class="p-2 text-center">
            <p class="text-white mb-2 small">Are you sure you want to sign out?</p>
            <div class="d-flex gap-2">
              <button class="btn btn-danger btn-sm w-100" id="confirm-logout">Yes</button>
              <button class="btn btn-secondary btn-sm w-100" id="cancel-logout">No</button>
            </div>
          </div>
        `,
      });

      const handlePopoverClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.id === "confirm-logout") {
          handleLogout();
        } else if (target.id === "cancel-logout") {
          popoverInstance?.hide();
        }
      };

      document.addEventListener("click", handlePopoverClick);
      return () => {
        popoverInstance?.dispose();
        document.removeEventListener("click", handlePopoverClick);
      };
    }
  }, [isAuthenticated]); // Re-run if login status changes

  const getButtonClass = (tabName: string, colorClass: string) => {
    return `w-100 p-4 btn-sidebar btn-invisible d-flex flex-row justify-content-start gap-4 align-items-center ${colorClass} ${
      activeTab === tabName ? "active" : ""
    }`;
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    store.setSuccessMessage("You have been signed out.");
    store.setActiveTab("home");
    setTimeout(() => {
      window.location.reload();
    }, 1000); // Wait 1 second for the user to see the toast
  };

  return (
    <div
      className="hm-content d-flex flex-column pt-3"
      style={{ width: "40vh" }}
    >
      <p className="txt-main-label fw-bold fs-5 mb-4 px-4">Main</p>

      <button
        className={getButtonClass("home", "home-active")}
        onClick={() => setActiveTab("home")}
      >
        <FontAwesomeIcon icon={faHouse} size="lg" /> Home
      </button>

      <button
        className={getButtonClass("featured", "featured-active")}
        onClick={() => setActiveTab("featured")}
      >
        <FontAwesomeIcon icon={faLightbulb} size="lg" /> Featured
      </button>

      <button
        className={getButtonClass("trending", "trending-active")}
        onClick={() => setActiveTab("trending")}
      >
        <FontAwesomeIcon icon={faChartColumn} size="lg" /> Trending
      </button>

      {/* --- ONLY SHOW OTHERS IF LOGGED IN --- */}
      {isAuthenticated && (
        <>
          <p className="txt-main-label fw-bold fs-5 mt-4 mb-4 px-4">Others</p>

          <button
            className={getButtonClass("inbox", "inbox-active")}
            onClick={() => setActiveTab("inbox")}
          >
            <FontAwesomeIcon icon={faBell} size="lg" /> Inbox
          </button>

          <button
            type="button"
            className={getButtonClass("your_posts", "your-post-active")}
            onClick={() => setActiveTab("your_posts")}
          >
            <FontAwesomeIcon icon={faMessage} size="lg" /> Your Posts
          </button>

          <button
            ref={logoutBtnRef}
            type="button"
            className="w-100 p-4 btn-sidebar btn-invisible d-flex flex-row justify-content-start gap-4 align-items-center"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" /> Sign
            out
          </button>
        </>
      )}
    </div>
  );
};

export default HomePageSidebar;
