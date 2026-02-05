// import React from 'react'

import HomePageHeader from "../forms/HomePageHeader";

const ContactPage = () => {
  return (
    <>
      <div className="w-100" style={{ position: "absolute", zIndex: 5000 }}>
        <HomePageHeader whatSelected="contact" />
      </div>
      <div
        className="h-100 w-100 position-absolute bg-image-homepage"
        style={{ backgroundColor: "black" }}
      >
        <div
          className="d-flex flex-column align-items-center justify-content-center position-absolute w-100 h-100 align-middle"
          style={{ position: "absolute" }}
        >
          <div className="d-flex flex-row flex-md-row gap-5 justify-content-center align-items-center">
            <div className="d-flex col-6 flex-column justify-content-center">
              <h1 className="fw-bold text-white" style={{ fontSize: "3.5rem" }}>
                Contact us!
              </h1>
              <p className="mt-2 text-white" style={{ fontSize: "1.5rem" }}>
                Need a hand? Reach out to the Home4Paws team for support,
                feedback, or just to say hello. We're always here to help our
                community of pet lovers grow!
              </p>
            </div>
            <div>
              <h1 className="mt-4 col-6 fw-normal text-white fs-5">Our Email: <p className="text-white">@contact.home4paws@gmail.com</p>
                </h1>
                <p className="text-white">+63 0987 654 3210</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
