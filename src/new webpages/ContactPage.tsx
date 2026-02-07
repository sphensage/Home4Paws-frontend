import React from "react";
import HomePageNavbar from "../forms/new/HomePageNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const ContactPage = () => {
  return (
    <>
      <HomePageNavbar />
      <img
        src="\src\assets\pet_img2_blur.png"
        className="w-100 vh-100 img-dynamic"
      />

      <div className="w-100 mt-5 pt-5 gap-2 fs-3 d-flex flex-column justify-content-center align-items-center">
        <h1 className="fw-bold fs-1">Get in touch with us at Home4Paws</h1>
        <p>
          We are committed to listening and responding to feedback in our forum
        </p>
      </div>

      <main
        className="container py-5 mt-5"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Phone Number - Left Aligned */}
        <div className="d-flex flex-row justify-content-start align-items-stretch gap-2 mb-5">
          <div
            className="col-lg-4 text-white div-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <section
              className="p-4 rounded shadow-sm"
              style={{ backgroundColor: "rgba(59, 27, 44, 0.8)" }}
            >
              <h2
                className="display-8 fw-bold mb-3"
                style={{ color: "#ce7853" }}
              >
                <FontAwesomeIcon icon={faPhone} size="1x" /> Phone
              </h2>
              <p className="lead mb-0">
                Don't hesitate to reach out to our team at{" "}
                <strong>+63 912 345 6789</strong> for urgent adoption inquiries
                and shelter support.
              </p>
            </section>
          </div>
          <div
            className="col-lg-4 text-white div-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <section
              className="p-4 rounded shadow-sm"
              style={{ backgroundColor: "rgba(59, 27, 44, 0.8)" }}
            >
              <h2
                className="display-8 fw-bold mb-3"
                style={{ color: "#ce7853" }}
              >
                <FontAwesomeIcon icon={faEnvelope} size="1x" /> Email
              </h2>
              <p className="lead mb-0">
                Send us your questions or partnership proposals at
                <strong> support@home4paws.com.ph</strong>. We typically respond
                within 24 hours.
              </p>
            </section>
          </div>
          <div
            className="col-lg-4 text-white div-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <section
              className="p-4 rounded shadow-sm"
              style={{ backgroundColor: "rgba(59, 27, 44, 0.8)" }}
            >
              <h2
                className="display-8 fw-bold mb-3"
                style={{ color: "#ce7853" }}
              >
                <FontAwesomeIcon icon={faClock} size="1x" /> Hours
              </h2>
              <p className="lead mb-0">
                Our digital platform is 24/7, but our physical shelter is open:{" "}
                <br />
                <strong>Mon - Sat: 9:00 AM - 6:00 PM</strong>
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactPage;
