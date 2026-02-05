import { useState } from "react";
import "/src/stylesheets/new/homepage_new.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBell,
  faChartColumn,
  faHouse,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

interface HomePageSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const HomePageSidebar = ({ activeTab, setActiveTab }: HomePageSidebarProps) => {
  const getButtonClass = (tabName: string, colorClass: string) => {
    return `w-100 p-4 btn-sidebar btn-invisible d-flex flex-row justify-content-start gap-4 align-items-center ${colorClass} ${
      activeTab === tabName ? "active" : ""
    }`;
  };

  return (
    <div
      className="hm-content d-flex flex-column pt-3"
      style={{ width: "40vh" }}
    >
      <p className="txt-main-label fw-bold fs-5 mb-4 px-4">Main</p>

      <button
        className={getButtonClass("home", "home-active")}
        onClick={() => setActiveTab("home")}
      >
        <FontAwesomeIcon icon={faHouse} size="lg" /> Home
      </button>

      <button
        className={getButtonClass("featured", "featured-active")}
        onClick={() => setActiveTab("featured")}
      >
        <FontAwesomeIcon icon={faLightbulb} size="lg" /> Featured
      </button>

      <button
        className={getButtonClass("trending", "trending-active")}
        onClick={() => setActiveTab("trending")}
      >
        <FontAwesomeIcon icon={faChartColumn} size="lg" /> Trending
      </button>

      <p className="txt-main-label fw-bold fs-5 mt-4 mb-4 px-4">Others</p>
      <button
        className={getButtonClass("inbox", "inbox-active")}
        onClick={() => setActiveTab("inbox")}
      >
        <FontAwesomeIcon icon={faBell} size="lg" /> Inbox
      </button>
      <button className="w-100 p-4 btn-sidebar btn-invisible d-flex flex-row justify-content-start gap-4 align-items-center">
        <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" /> Sign out
      </button>
    </div>
  );
};

export default HomePageSidebar;
