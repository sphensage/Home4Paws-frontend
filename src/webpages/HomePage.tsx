import { useState, useEffect } from "react";
import { getPaws, toggleLike, type PawsListing } from "../api";
import HomePageForum from "../forms/HomePageForum";
import HomePageHeader from "../forms/HomePageHeader";
import CreatePostForm from "../forms/CreatePostForm";
import PostDisplay from "../components/item display/PostDisplay";
import ImageDisplay from "../components/item display/ImageDisplay";
import { useAuth } from "../AuthContext";
import { useAppStore } from "../useAppStore";
import "/src/stylesheets/homepage.css";

const HomePage = () => {
  const setImageDisplay = useAppStore((state) => state.setImageDisplay);
  const isImageDisplayed = useAppStore((state) => state.isImageDisplayed);

  const { user } = useAuth();
  const [paws, setPaws] = useState<PawsListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePaw, setActivePaw] = useState<PawsListing | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [isMoved, setIsMoved] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPostItemModal, setShowPostItemModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Unified Fetch: Now correctly passes filters to the API
  const fetchPosts = async (page: number = 1) => {
    setLoading(true);
    // CRITICAL: We now pass searchQuery and selectedCity here
    const result = await getPaws(page, searchQuery, selectedCity);

    if (result.success && result.paws && result.meta) {
      setPaws(result.paws);
      setCurrentPage(result.meta.current_page);
      setLastPage(result.meta.last_page);
    }
    setLoading(false);
  };

  // 1. Filter Effect: Debounced to stop flickering while typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPosts(1); // Always reset to page 1 on search/filter
    }, 400); // Wait 400ms after last keystroke

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedCity]);

  const handleNext = () => {
    if (currentPage < lastPage) fetchPosts(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) fetchPosts(currentPage - 1);
  };

  // 2. Master Sync Logic: Updates both the List and the Modal simultaneously
  const handleLike = async (paws_id: number) => {
    if (!user) return;

    // Prevent owner from liking their own post locally
    const target = paws.find((p) => p.paws_id === paws_id);
    if (target && Number(user.id) === Number(target.user_id)) return;

    const result = await toggleLike(paws_id);

    if (result.success) {
      setPaws((prev) =>
        prev.map((p) => {
          if (p.paws_id === paws_id) {
            const updatedPaw = {
              ...p,
              reactions_count: result.reactions_count,
              reactions: result.reactions,
            };
            // Sync the Modal instantly
            setActivePaw(updatedPaw);
            return updatedPaw;
          }
          return p;
        }),
      );
    }
  };

  return (
    <>
      {/* BACKGROUND & FORUM LAYER */}
      <div
        className="h-100 w-100 position-absolute bg-image-homepage"
        style={{ backgroundColor: "black", zIndex: 1 }}
      >
        <HomePageHeader whatSelected="home" />

        <HomePageForum
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          isMoved={isMoved}
          setIsMoved={setIsMoved}
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
          showPostItemModal={showPostItemModal}
          setShowPostItemModal={setShowPostItemModal}
          setActivePaw={setActivePaw}
          paws={paws}
          loading={loading}
          currentPage={currentPage}
          lastPage={lastPage}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>

      {/* WELCOME SCREEN LAYER */}
      <div
        className="d-flex flex-column align-items-start justify-content-center position-absolute w-100 h-100 ps-5 align-middle"
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          color: "white",
          opacity: isMoved ? 1 : 0,
          pointerEvents: isMoved ? "auto" : "none",
          transition: "opacity 0.3s ease-in-out",
          zIndex: isMoved ? 100 : 0,
        }}
      >
        <h1 className="fw-bold" style={{ fontSize: "3.5rem" }}>
          Welcome to Home4Paws
        </h1>
        <p className="mt-2" style={{ fontSize: "1.5rem" }}>
          A forum for sharing pet adoption and re-homing posts to support animal
          welfare.
        </p>
        <button
          className="btn fw-bold fs-5 mt-3 ps-4 pe-4"
          style={{
            backgroundColor: "white",
            color: "#8b2e58",
            width: "10rem",
            height: "3rem",
            cursor: "pointer",
          }}
          onClick={() => setIsMoved(false)}
        >
          Visit forum
        </button>
      </div>

      {/* MODAL: CREATE POST */}
      {showCreateModal && (
        <div
          className="modal-backdrop-custom"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="modal-content-custom"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: 8,
              padding: 20,
              width: "min(720px, 95%)",
              maxHeight: "85vh",
              overflow: "auto",
            }}
          >
            <CreatePostForm
              onClose={() => setShowCreateModal(false)}
              onSuccess={() => fetchPosts(1)}
            />
          </div>
        </div>
      )}

      {/* MODAL: POST DISPLAY */}
      {showPostItemModal && activePaw && (
        <div
          onClick={() => setShowPostItemModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: 8,
              padding: 20,
              width: "min(720px, 95%)",
              maxHeight: "85vh",
              overflow: "auto",
              color: "#8b2e58",
            }}
          >
            <PostDisplay paw={activePaw} onLike={handleLike} />
          </div>
        </div>
      )}

      {isImageDisplayed && (
        <div
          onClick={() => setImageDisplay(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: 8,
              padding: 20,
              width: "min(720px, 95%)",
              maxHeight: "85vh",
              overflow: "auto",
              color: "#8b2e58",
            }}
          >
            <ImageDisplay/>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
