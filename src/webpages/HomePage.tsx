import { useState } from "react";

import HomePageForum from "../forms/HomePageForum";
import HomePageHeader from "../forms/HomePageHeader";
import "/src/stylesheets/homepage.css";

const HomePage = () => {
  const [isMoved, setIsMoved] = useState(true);

  return (
    <>
      <div
        className="h-100 w-100 position-absolute bg-image-homepage"
        style={{ backgroundColor: "black" }}
      >
        <HomePageHeader />
        <HomePageForum isMoved={isMoved} setIsMoved={setIsMoved} />
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
          className="btn fw-bold fs-6 mt-3 ps-4 pe-4"
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
    </>
  );
};

export default HomePage;
