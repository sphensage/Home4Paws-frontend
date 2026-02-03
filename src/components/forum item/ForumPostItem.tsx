import type { PawsListing } from '../../api';

interface ForumPostItemProps {
  paw?: PawsListing; // Made optional with '?' to handle loading states
  showPostItemModal: boolean;
  setShowPostItemModal: (show: boolean) => void;
}

const ForumPostItem = ({
  paw,
  showPostItemModal,
  setShowPostItemModal,
}: ForumPostItemProps) => {

  // 1. Guard Clause: If paw is undefined, return the placeholder version
  if (!paw) {
    return (
      <button
        id="postItem"
        className="d-flex flex-row justify-content-between align-items-center w-100 flex-shrink-0 placeholder-glow"
        style={{ border: "none", backgroundColor: "white", borderRadius: "7px", height: "4.5rem" }}
      >
        <div className="col-6 d-flex flex-row justify-content-start align-items-center">
          <div className="d-flex ms-4 justify-content-center align-items-center placeholder bg-dark" style={{ width: "35px", height: "35px" }} />
          <div className="mx-3 col-6">Golden retriever</div>
        </div>
        <div className="d-flex flex-row col-6 justify-content-around align-items-center text-muted">
          <div className="mx-3 col-3">3 million years ago</div>
          <div className="mx-3 col-3">67</div>
        </div>
      </button>
    );
  }

  // 2. Logic for real data (Relative Time)
  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return postDate.toLocaleDateString();
  };

  // 3. Render actual data
  return (
    <button
      id="postItem"
      className="d-flex flex-row justify-content-between align-items-center w-100 flex-shrink-0"
      style={{
        border: "none",
        backgroundColor: "white",
        borderRadius: "7px",
        height: "4.5rem",
      }}
      onClick={() => setShowPostItemModal(true)}
    >
      <div className="col-6 d-flex flex-row justify-content-start align-items-center">
        <div
          id="profileIconBox"
          className="d-flex ms-4 justify-content-center align-items-center bg-dark"
          style={{ width: "35px", height: "35px", borderRadius: "50%" }}
        />
        <div id="postDescription" className="mx-3 col-6 text-start text-truncate">
          {paw.title}
        </div>
      </div>
      <div className="d-flex flex-row col-6 justify-content-around align-items-center text-muted">
        <div id="datePosted" className="mx-3 col-6 text-end">
          {getRelativeTime(paw.created_at)}
        </div>
        <div id="likes" className="mx-3 col-3">
          0
        </div>
      </div>
    </button>
  );
};

export default ForumPostItem;

