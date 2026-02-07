import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "/src/stylesheets/new/post_item.css";
import "/src/stylesheets/new/homepage_new.css";
import {
  faClockRotateLeft,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAppStore } from "../../useAppStore";

export const DummyPostItem = () => {
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  return (
    <button
      className="w-100 btn-invisible post-bg d-flex flex-column fs-5 p-3 justify-content-start align-items-start"
      role="button"
      tabIndex={0}
      onClick={() => setActiveTab("viewPost")}
    >
      <div className="d-flex flex-row gap-3 fw-bold align-items-center">
        Title
        <div className="fw-normal post-user" style={{ fontSize: "15px" }}>
          <FontAwesomeIcon icon={faUser} size="xs" className="me-2" />
          John Doe
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

      <div
        className="fw-normal w-100 text-truncate text-start"
        style={{ fontSize: "15px" }}
      >
        Description here
      </div>

      <div className="d-flex mt-2 flex-row gap-3 fw-bold align-items-center">
        <div className="txt-muted fw-normal" style={{ fontSize: "13px" }}>
          <FontAwesomeIcon icon={faClockRotateLeft} size="sm" /> 5 hours ago
        </div>

        <div className="txt-main-label" style={{ fontSize: "13px" }}>
          <FontAwesomeIcon icon={faHeart} /> 7
        </div>
      </div>
    </button>
  );
};

export default DummyPostItem;
