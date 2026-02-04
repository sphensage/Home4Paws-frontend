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
          className="d-flex flex-column align-items-center justify-content-center position-absolute w-100 h-100 ps-5 align-middle"
          style={{ position: "absolute" }}
        >
          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center">
              <h1 className="fw-bold text-white" style={{ fontSize: "3.5rem" }}>
                Contact us!
              </h1>
              <p className="mt-2 text-white" style={{ fontSize: "1.5rem" }}>
                Need a hand? Reach out to the Home4Paws team for support,
                feedback, or just to say hello. We're always here to help our
                community of pet lovers grow!
              </p>
            </div>
            <form
              className="w-100 h-100 mx-5 p-4 form-control needs-validation"
              noValidate
            >
              <textarea
                id="feedback"
                className="form-select"
                placeholder="Give us your feedback!"
                rows={5}
              />
              <div className="w-100">
                <button className="w-100 btn btn-success mt-4">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
