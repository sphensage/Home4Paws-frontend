// import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "/src/stylesheets/new/post_item.css";
import "/src/stylesheets/new/homepage_new.css";
import {
  faClock,
  faClockRotateLeft,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const PostItem = () => {
  return (
    <button className="btn-invisible w-100 post-bg d-flex flex-column fs-5 p-3 justify-content-start align-items-start">
      <div
        id="postTitle"
        className="d-flex flex-row gap-3 fw-bold justify-content-start align-items-center"
      >
        Golden retriever
        <div
          id="postUser"
          className="fw-normal post-user"
          style={{ fontSize: "15px" }}
        >
          <FontAwesomeIcon icon={faUser} size="xs" className="me-2" />
          John Porkette
        </div>
      </div>
      <div
        id="postDescription"
        className="fw-normal w-100 text-truncate text-start"
        style={{ fontSize: "15px" }}
      >
        Guys I have so many many golden retrievers can someone please go get
        them cuz blah blah blah longongogn
      </div>
      <div
        id="postDetails"
        className="d-flex mt-2 flex-row gap-3 fw-bold justify-content-start align-items-center"
      >
        <div
          id="postDate"
          className="txt-muted fw-normal"
          style={{ fontSize: "13px" }}
        >
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            size="sm"
            className="me-0"
          />{" "}
          5 hours ago
        </div>
        <div
          id="postLikes"
          className="txt-main-label"
          style={{ fontSize: "13px" }}
        >
          <FontAwesomeIcon icon={faHeart} /> 2
        </div>
      </div>
    </button>
  );
};
