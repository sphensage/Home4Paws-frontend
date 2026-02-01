// import React from 'react'

import HomePageHeader from "../forms/HomePageHeader";

const ContactPage = () => {
  return (
    <div
      className="h-100 w-100 position-absolute bg-image-homepage"
      style={{ backgroundColor: "black" }}
    >
      <HomePageHeader whatSelected="contact" />
    </div>
  );
};

export default ContactPage;
