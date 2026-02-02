import { useState } from "react";
import ForumContents from "../components/forum/ForumContents";
import ForumNavbar from "../components/forum/ForumNavbar";

interface HomePageForumProps {
  isMoved: boolean;
  setIsMoved: (isMoved: boolean) => void;
  showCreateModal: boolean;
  setShowCreateModal: (show: boolean) => void;
}

const HomePageForum = (props: HomePageForumProps) => {
  const { isMoved, setIsMoved, showCreateModal, setShowCreateModal } = props;
  const [navbarVariant, setNavbarVariant] = useState<"home" | "inbox">("home");

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-end vh-100 fixed-bottom"
      style={{
        color: "white",
        opacity: isMoved ? 0 : 1,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div>
        <button
          className="mt-3 p-2"
          style={{
            backgroundColor: "rgba(0,0,0,0)",
            border: "none",
            opacity: 0,
            pointerEvents: "none",
            transform: "rotate(180deg)",
            transition: "transform 0.6s ease-in-out",
            transitionProperty: "transform, opacity",
          }}
          onClick={() => setIsMoved(!isMoved)}
        >
          <img src="/src/assets/arrow_icon.svg" alt="Toggle Forum" />
        </button>
      </div>
      <div
        id="forumForm"
        className="w-100"
        style={{
          backgroundColor: "#efefef",
          padding: "20px 50px",
          height: isMoved ? "calc(89% - 90%)" : "83%",
          transition: "height 0.4s ease-in-out, opacity 0.4s ease-in-out",
          overflowY: "scroll",
          boxSizing: "border-box",
        }}
      >
        <div
          className="h-100 w-100 p-1"
          style={{
            backgroundColor: "rgba(0,0,0,0)",
            boxSizing: "border-box",
          }}
        >
          <ForumNavbar variant={navbarVariant} />
          <ForumContents
            onVariantChange={setNavbarVariant}
            showCreateModal={showCreateModal}
            setShowCreateModal={setShowCreateModal}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageForum;
