// import React from 'react'

import HomePageHeader from "../forms/HomePageHeader";

const AboutPage = () => {
  return (
    <>
      <div className="w-100" style={{ position: "absolute", zIndex: 5000 }}>
        <HomePageHeader whatSelected="about" />
      </div>
      <div
        className="h-100 w-100 position-absolute bg-image-homepage"
        style={{ backgroundColor: "black" }}
      >
        <div
          className="d-flex flex-column align-items-center justify-content-center position-absolute w-100 h-100 px-5 align-middle"
          style={{ position: "absolute" }}
        >
          <div className="d-flex flex-column flex-md-row justify-content-center gap-5 px-5 align-items-start">
            <div className="d-flex col-6 flex-column justify-content-center">
              <h1 className="fw-bold text-white" style={{ fontSize: "3.5rem" }}>
                Our Mission
              </h1>
              <p className="mt-2 text-white" style={{ fontSize: "1.5rem" }}>
                Our mission is to simplify the rehoming process through a safe,
                transparent, and cost-free platform that prioritizes the
                well-being of animals and the joy of their future families.
              </p>
            </div>
            <div className="d-flex col-6 flex-column justify-content-center">
              <h1 className="fw-bold text-white" style={{ fontSize: "3.5rem" }}>
                Our Story
              </h1>
              <p className="mt-2 text-white" style={{ fontSize: "1.5rem" }}>
                We realized that sometimes, life circumstances change. Whether
                it's a move, an allergy, or an unexpected life event, rehoming a
                pet is a difficult and emotional decision. We wanted to create a
                space that removes the financial barrier and focuses entirely on
                the animal’s future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
