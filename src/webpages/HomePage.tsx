import { useState } from "react";

import HomePageForum from "../forms/HomePageForum";
import HomePageHeader from "../forms/HomePageHeader";
import CreatePostForm from "../forms/CreatePostForm";
import "/src/stylesheets/homepage.css";
import PostDisplay from "../components/item display/PostDisplay";

const HomePage = () => {
  const [isMoved, setIsMoved] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPostItemModal, setShowPostItemModal] = useState(false);

  return (
    <>
      <div
        className="h-100 w-100 position-absolute bg-image-homepage"
        style={{ backgroundColor: "black" }}
      >
        <HomePageHeader whatSelected="home" />

        {/* Level of components guide:
             Homepage:
                a. HomepageHeader

                b. HomePageForum
                    I. ForumNavbar

                    II. ForumContents
                        1. ForumHome
                            a. ForumHomeHeader
                            b. ForumPostItem

                        2. ForumInbox
                            a. ForumInboxHeader
                            b. ForumInboxItem
        */}

        <HomePageForum
          isMoved={isMoved}
          setIsMoved={setIsMoved}
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
          showPostItemModal={showPostItemModal}
          setShowPostItemModal={setShowPostItemModal}
        />
      </div>
      <div
        className="d-flex flex-column align-items-start justify-content-center position-absolute w-100 h-100 ps-5 align-middle"
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          color: "white",
          opacity: isMoved ? 1 : 0,
          pointerEvents: isMoved ? "auto" : "none",
          transition: "opacity 0.3s ease-in-out",
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
            zIndex: 50000,
            opacity: isMoved ? 1 : 0,
            pointerEvents: isMoved ? "auto" : "none",
            transition: "opacity 0.3s ease-in-out",
          }}
          onClick={() => setIsMoved(false)}
        >
          Visit forum
        </button>
      </div>

      {showCreateModal && (
        <div
          id="modal-backdrop"
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
            <CreatePostForm onClose={() => setShowCreateModal(false)} />
          </div>
        </div>
      )}

      {showPostItemModal && (
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
            <PostDisplay />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
