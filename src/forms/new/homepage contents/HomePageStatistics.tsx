import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "/src/stylesheets/new/homepage_new.css";
import { faComments, faPaw, faUser, faCheckCircle } from "@fortawesome/free-solid-svg-icons"; // Added faCheckCircle
import { useAppStore } from "../../../useAppStore";

const HomePageStatistics = () => {
  const stats = useAppStore((state) => state.stats);
  const fetchStats = useAppStore((state) => state.fetchStats);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="hm-stats" style={{ width: "40vh" }}>
      <div className="hm-stats d-flex flex-column px-4 pt-3 " style={{ width: "40vh" }}>
        <p className="txt-main-label fw-bold fs-5 mb-4">Forum Statistics</p>
        
        {/* Total Posts */}
        <div className="d-flex flex-row justify-content-start mb-2 gap-3 align-items-center" style={{fontSize: "15px"}}>
          <FontAwesomeIcon icon={faComments} size="lg" />
          <div className="d-flex flex-column justify-content-start align-items-start">
            <p className="mb-0 fw-bold">{stats?.total_posts ?? "..."}</p>
            <p className="mb-0 txt-muted">Total posts</p>
          </div>
        </div>

        {/* Total Users */}
        <div className="d-flex flex-row justify-content-start mb-2 gap-3 align-items-center">
          <FontAwesomeIcon icon={faUser} size="lg" />
          <div className="d-flex flex-column justify-content-start align-items-start">
            <p className="mb-0 fw-bold">{stats?.total_users ?? "..."}</p>
            <p className="mb-0 txt-muted">Total users</p>
          </div>
        </div>

        {/* Total Adopted - New Section! */}
        <div className="d-flex flex-row justify-content-start gap-3 align-items-center">
          <FontAwesomeIcon icon={faCheckCircle} size="lg" />
          <div className="d-flex flex-column justify-content-start align-items-start">
            <p className="mb-0 fw-bold">{stats?.total_adopted ?? "0"}</p>
            <p className="mb-0 txt-muted">Pets adopted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageStatistics;