<<<<<<< HEAD
import React from 'react'

const HomePageContents = () => {
  return (
    <div>HomePageContents</div>
  )
}

export default HomePageContents
=======
import { useState } from "react";

import HomePageCenter from "./homepage contents/HomePageCenter";
import HomePageSidebar from "./homepage contents/HomePageSidebar";
import HomePageStatistics from "./homepage contents/HomePageStatistics";
import "/src/stylesheets/new/homepage_new.css";

const HomePageContents = () => {
  // Shared state between Sidebar and Center
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <div className="d-flex flex-row gap-5 justify-content-center align-items-start px-5 mt-3">
      {/* Pass state and setter to Sidebar */}
      <HomePageSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Pass state to Center */}
      <HomePageCenter activeTab={activeTab} />

      <HomePageStatistics />
    </div>
  );
};
export default HomePageContents;
>>>>>>> origin/ex
