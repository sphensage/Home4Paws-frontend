import React from "react";
import ListInboxItem from "./item cards/list card/ListInboxItem";
import "/src/stylesheets/new/homepage_new.css";

const HomePageInbox = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row justify-content-between align-items-start">
        <div className="txt-main-label fw-bold fs-4">My Inbox</div>
      </div>
      <ListInboxItem />
    </div>
  );
};

export default HomePageInbox;
