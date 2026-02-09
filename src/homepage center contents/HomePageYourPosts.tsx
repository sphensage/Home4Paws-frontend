import "/src/stylesheets/new/homepage_new.css";
import ListPostItems from "./item cards/list card/ListPostItems";
import { useAppStore } from "../useAppStore";
import HomePageMiniNav from "../forms/new/HomePageMiniNav";

export const HomePageYourPosts = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row justify-content-between align-items-start">
        <div className="txt-main-label fw-bold fs-4">Your posts</div>

        <HomePageMiniNav />
      </div>

      {/* 2. Add the List component here - the store handles the "Trending" logic! */}
      <ListPostItems />
    </div>
  );
};
