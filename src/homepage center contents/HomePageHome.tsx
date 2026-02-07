// import React from "react"; // Not needed if you only use hooks
import ListPostItems from "./item cards/list card/ListPostItems";
import "/src/stylesheets/new/homepage_new.css";
import HomePageMiniNav from "../forms/new/HomePageMiniNav";
// import ListPostItemsDummy from "./item cards/list card/ListPostItemDummy";

const HomePageHome = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row justify-content-between align-items-start">
        <div className="txt-main-label fw-bold fs-4">Forum Posts</div>
        <HomePageMiniNav />
      </div>
      {/* LIST ITEMS HERE */}
      <ListPostItems />
    </div>
  );
};

export default HomePageHome;
