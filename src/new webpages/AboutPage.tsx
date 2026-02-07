import React from "react";
import HomePage from "./HomePage";
import HomePageNavbar from "../forms/new/HomePageNavbar";
import "/src/stylesheets/new/images.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faDog,
  faSignsPost,
} from "@fortawesome/free-solid-svg-icons";

const AboutPage = () => {
  return (
    <>
      <HomePageNavbar />

      {/* Background Layer */}
      <div className="img-container">
        <img
          src="/src/assets/pet_img1_blur.png"
          className="w-100 vh-100 img-dynamic"
          alt="Background"
        />
      </div>

      {/* Content Layer */}
      <main
        className="container py-5 mt-3"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="d-flex flex-row justify-content-start">
          <div
            className="col-lg-8 text-white div-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Our Story Section */}
            <section
              className="mb-5 p-4 rounded shadow-sm"
              style={{ backgroundColor: "rgba(59, 27, 44, 0.8)" }}
            >
              <h2
                className="display-4 fw-bold mb-4"
                style={{ color: "#ce7853" }}
              >
                <FontAwesomeIcon icon={faDog} size="1x" /> Our Purpose
              </h2>
              <p className="lead">
                To provide a reliable digital platform that connects homeless
                pets with loving families. By hosting a centralized community
                for adoption and welfare, we aim to simplify the re-homing
                process, support overextended shelters, and ensure that every
                domestic animal has a clear path to a safe, permanent home.
              </p>
            </section>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <div
            className="col-lg-8 text-white div-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            {/* Our Story Section */}
            <section
              className="p-4 rounded shadow-sm"
              style={{ backgroundColor: "rgba(59, 27, 44, 0.8)" }}
            >
              <h2
                className="display-4 fw-bold mb-4"
                style={{ color: "#ce7853" }}
              >
                <FontAwesomeIcon icon={faBullseye} size="1x" /> Our Mission
              </h2>
              <p className="lead">
                Our mission is to empower the community to advocate for animal
                welfare through technology and shared resources. We are
                dedicated to facilitating responsible pet adoption, educating
                owners, and fostering a supportive network that ensures no
                animal is left behind, ultimately creating a world where every
                pet is cherished and protected.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default AboutPage;
