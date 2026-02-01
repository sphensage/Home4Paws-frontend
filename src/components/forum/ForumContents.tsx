import { useState } from "react";
import ForumInbox from "./ForumInbox";
import ForumHome from "./ForumHome";

interface ForumContentsProps {
  onVariantChange?: (variant: "home" | "inbox") => void;
}

const ForumContents = ({ onVariantChange }: ForumContentsProps) => {
  const [active, setActive] = useState<"home" | "inbox">("home");

  const activeColorFilter =
    "brightness(0) saturate(100%) invert(25%) sepia(21%) saturate(2537%) hue-rotate(287deg) brightness(94%) contrast(94%)";
  const inactiveColorFilter = "brightness(0) saturate(100%)";

  const handleActiveChange = (newActive: "home" | "inbox") => {
    setActive(newActive);
    onVariantChange?.(newActive);
  };

  return (
    <div
      className="mt-3 d-flex flex-column flex-md-row w-100 gap-3"
      style={{ height: "calc(100% - 80px)" }}
    >
      <div
        id="sidebar"
        className="h-100 p-3"
        style={{
          backgroundColor: "white",
          borderRadius: "7px",
          flex: "3",
        }}
      >
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
              transition: "background-color 0.3s, color 0.3s",
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
              filter:
                active === "inbox" ? activeColorFilter : inactiveColorFilter,
              transition: "filter 0.3s",
            }}
          />
          <button
            type="button"
            className="w-100 text-start fw-bold ps-3"
            style={{
              backgroundColor: active === "inbox" ? "#f1d6e2" : "#ffffff",
              color: active === "inbox" ? "#8b2e58" : "black",
              border: "none",
              borderRadius: "6px",
              height: "3.25rem",
              transition: "background-color 0.3s, color 0.3s",
            }}
            onClick={() => handleActiveChange("inbox")}
          >
            Inbox
          </button>
        </div>
      </div>

      <div
        className="h-100"
        style={{
          backgroundColor: "white",
          borderRadius: "7px",
          flex: "9",
        }}
      >
        {active === "home" && (
          <div>
            <ForumHome />
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
