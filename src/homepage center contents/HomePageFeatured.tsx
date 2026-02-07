import "/src/stylesheets/new/homepage_new.css";
import ListPostItems from "./item cards/list card/ListPostItems";
import { useAppStore } from "../useAppStore";
import HomePageMiniNav from "../forms/new/HomePageMiniNav";

const HomePageFeatured = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row justify-content-between align-items-start">
        <div className="txt-main-label fw-bold fs-4">Featured posts</div>
        <HomePageMiniNav />
      </div>

      {/* The store fetches "popular" posts automatically because activeTab is "featured" */}
      <ListPostItems />
    </div>
  );
};

export default HomePageFeatured;
