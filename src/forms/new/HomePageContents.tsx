import HomePageCenter from "./homepage contents/HomePageCenter";
import HomePageSidebar from "./homepage contents/HomePageSidebar";
import HomePageStatistics from "./homepage contents/HomePageStatistics";
import "/src/stylesheets/new/homepage_new.css";
// import { useAppStore } from "../../useAppStore"; // We can hook this up later

const HomePageContents = () => {
  /*
  // We remove this shared state. We will manage 'activeTab' within the store later.
  const [activeTab, setActiveTab] = useState<string>("home"); 
  */

  return (
    <div className="d-flex flex-row gap-5 justify-content-center align-items-start px-5 mt-3">
      {/* 
      // The Sidebar should eventually read/set the active tab directly from the store
      <HomePageSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      */}
      <HomePageSidebar />

      {/* 
      // The Center should eventually read the active tab directly from the store
      <HomePageCenter activeTab={activeTab} />
      */}
      <HomePageCenter />

      <HomePageStatistics />
    </div>
  );
};
export default HomePageContents;
