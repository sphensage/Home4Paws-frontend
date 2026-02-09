import React from "react";
import HomePageHome from "../../../homepage center contents/HomePageHome";
import HomePageFeatured from "../../../homepage center contents/HomePageFeatured";
import {HomePageYourPosts} from "../../../homepage center contents/HomePageYourPosts";
import { HomePageTrending } from "../../../homepage center contents/HomePageTrending";
import "/src/stylesheets/new/homepage_new.css";
import HomePageInbox from "../../../homepage center contents/HomePageInbox";
import { useAppStore } from "../../../useAppStore"; // Import the store
import HomePageCreatePost from "../../../homepage center contents/HomePageCreatePost";
import HomePageEditPost from "../../../homepage center contents/HomePageEditPost";
import ViewPost from "../../../homepage center contents/ViewPost";

/* We no longer need this interface or prop drilling:
interface HomePageCenterProps {
  activeTab: string;
}
*/

const HomePageCenter = (/*{ activeTab }: HomePageCenterProps*/) => {
  const activeTab = useAppStore((state) => state.activeTab);

  return (
    <div
      className="col-6 hm-content"
      style={{ backgroundColor: "rgba(0,0,0,0)" }}
    >
      {activeTab === "home" && <HomePageHome />}
      {activeTab === "featured" && <HomePageFeatured />}
      {activeTab === "trending" && <HomePageTrending />}
      {activeTab === "inbox" && <HomePageInbox />}
      {activeTab === "createPost" && <HomePageCreatePost />}
        {activeTab === "edit_post" && <HomePageEditPost />}
      {activeTab === "viewPost" && <ViewPost />}
       {activeTab === "your_posts" && <HomePageYourPosts />}
    </div>
  );
};

export default HomePageCenter;
