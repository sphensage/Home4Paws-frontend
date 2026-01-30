import HomePageForum from "../forms/HomePageForum";
import HomePageHeader from "../forms/HomePageHeader";
import "/src/stylesheets/homepage.css";

const HomePage = () => {
  return (
    <div
      className="h-50 w-100 position-absolute bg-image-homepage"
      style={{ backgroundColor: "black" }}
    >
      <div className="position-relative" style={{ zIndex: 9 }}>
        <HomePageHeader />
      </div>
      <HomePageForum />
    </div>
  );
};

export default HomePage;
