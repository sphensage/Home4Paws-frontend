import React from "react";
import HomePageHome from "../../../homepage center contents/HomePageHome";
import HomePageFeatured from "../../../homepage center contents/HomePageFeatured";
import { HomePageTrending } from "../../../homepage center contents/HomePageTrending";
import "/src/stylesheets/new/homepage_new.css";
import HomePageInbox from "../../../homepage center contents/HomePageInbox";

interface HomePageCenterProps {
  activeTab: string;
}

const HomePageCenter = ({ activeTab }: HomePageCenterProps) => {
  return (
    <div
      className="col-6 hm-content"
      style={{ backgroundColor: "rgba(0,0,0,0)" }}
    >
      {activeTab === "home" && <HomePageHome />}
      {activeTab === "featured" && <HomePageFeatured />}
      {activeTab === "trending" && <HomePageTrending />}
      {activeTab === "inbox" && <HomePageInbox />}
    </div>
  );
};

export default HomePageCenter;
