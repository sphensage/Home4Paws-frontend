import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "/src/stylesheets/new/post_item.css";
import "/src/stylesheets/new/homepage_new.css";
import {
  faClockRotateLeft,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import type { PawsListing } from "../../api";

const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals = [
    { label: "y", value: 31536000 },
    { label: "mo", value: 2592000 },
    { label: "d", value: 86400 },
    { label: "h", value: 3600 },
    { label: "m", value: 60 },
  ];

  for (const i of intervals) {
    const count = Math.floor(seconds / i.value);
    if (count >= 1) return `${count}${i.label} ago`;
  }

  return `${seconds}s ago`;
};

export const PostItem = ({ paw }: { paw: PawsListing }) => {
  return (
    <button
      className="w-100 btn-invisible post-bg d-flex flex-column fs-5 p-3 justify-content-start align-items-start"
      data-paw-id={paw.paws_id}
      role="button"
      tabIndex={0}
    >
      <div className="d-flex flex-row gap-3 fw-bold align-items-center">
        {paw.title}
        <div className="fw-normal post-user" style={{ fontSize: "15px" }}>
          <FontAwesomeIcon icon={faUser} size="xs" className="me-2" />
          {paw.user.name}
        </div>
        {paw.status === "adopted" ? (
          <span
            className="badge text-bg-warning text-white"
            style={{ fontSize: "10px" }}
          >
            Adopted
          </span>
        ) : (
          <span
            className="badge text-bg-success text-white"
            style={{ fontSize: "10px" }}
          >
            Open
          </span>
        )}
      </div>

      <div
        className="fw-normal w-100 text-truncate text-start"
        style={{ fontSize: "15px" }}
      >
        {paw.description}
      </div>

      <div className="d-flex mt-2 flex-row gap-3 fw-bold align-items-center">
        <div className="txt-muted fw-normal" style={{ fontSize: "13px" }}>
          <FontAwesomeIcon icon={faClockRotateLeft} size="sm" />{" "}
          {timeAgo(paw.created_at)}
        </div>

        <div className="txt-main-label" style={{ fontSize: "13px" }}>
          <FontAwesomeIcon icon={faHeart} /> {paw.reactions_count}
        </div>
      </div>
    </button>
  );
};
