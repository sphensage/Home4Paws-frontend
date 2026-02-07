import {
  faClockRotateLeft,
  faHeart,
  faPaw,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "/src/stylesheets/new/homepage_new.css";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { ImageButton } from "../forms/new/ImageButton";

const ViewPost = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="txt-main-label fw-bold fs-4">View Post</div>
      </div>
      <div
        className="p-3 w-100 d-flex flex-column gap-1 justify-content-start align-items-start hm-content"
        style={{ height: "60vh", minHeight: "60vh", overflowY: "scroll" }}
      >
        <div
          className="d-flex flex-row gap-3 fw-bold align-items-center"
          style={{ fontSize: "19px" }}
        >
          POST TITLE HERE
          <div className="fw-normal post-user" style={{ fontSize: "13px" }}>
            <FontAwesomeIcon icon={faUser} size="xs" className="me-2" />
            USERNAME
          </div>
          <span
            className="badge text-bg-warning text-white"
            style={{ fontSize: "10px" }}
          >
            Adopted
          </span>
          <span
            className="badge text-bg-success text-white"
            style={{ fontSize: "10px" }}
          >
            Open
          </span>
        </div>
        <div className="txt-muted fw-normal mb-2" style={{ fontSize: "13px" }}>
          <FontAwesomeIcon icon={faClockRotateLeft} size="sm" /> 5 hours ago
        </div>
        <div className="mb-5" style={{ fontSize: "15px" }}>
          Description here
        </div>
        <div className="mb-2 txt-muted" style={{ fontSize: "12px" }}>
          Images:
        </div>
        <div className="w-100 d-flex mb-3 flex-row gap-2 justify-content-start align-items-center">
          <ImageButton />
          <ImageButton />
          <ImageButton />
        </div>
      </div>
      <div className="w-100 d-flex flex-row align-items-center justify-content-start gap-2">
        <button
          type="button"
          className="btn col-3 btn-facebook fw-bold d-flex align-items-center gap-2 justify-content-center"
        >
          Facebook account <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
        </button>

        {/* Owner of the post */}
        <button
          type="button"
          className="btn col-3 btn-success fw-bold d-flex align-items-center gap-2 justify-content-center"
        >
          Mark as adopted? <FontAwesomeIcon icon={faPaw} size="lg" />
        </button>

        {/* Likes */}

        <button type="button" className="btn btn-invisible txt-muted">
          <FontAwesomeIcon icon={faHeart} size="lg" /> 243
        </button>

        {/* Liked post | OWNER CANT LIKE POST */}

        <button type="button" className="btn btn-invisible txt-liked">
          <FontAwesomeIcon icon={faHeart} size="lg" /> 244
        </button>
      </div>
    </div>
  );
};

export default ViewPost;
