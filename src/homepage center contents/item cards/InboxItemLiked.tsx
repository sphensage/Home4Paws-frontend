import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import type { InboxNotification } from "../../api";
import { useAppStore } from "../../useAppStore";
import { getPaw } from "../../api"; // Ensure this matches your API export name

const InboxItemLiked = ({ notification }: { notification: InboxNotification }) => {
  const setActiveTab = useAppStore((state) => state.setActiveTab);
  const setActivePaw = useAppStore((state) => state.setActivePaw);
   const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);

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
    const handleNotifClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // 1. Call the API (Triggers PawsController@show)
    const result = await getPaw(notification.paws_id);
    
    if (result.success && result.paw) {
        // 2. Set the Full Data into the Store
        setActivePaw(result.paw); 
        
        // 3. Switch the UI Tab
        setActiveTab("viewPost");     

        // 4. (Optional) Mark as read in backend
        // api.post(`/inbox/${notification.id}/mark-read`);
    } else {
        // Show the toast if the post was deleted or not found
        setSuccessMessage("This post is no longer available 🐾");
    }
  };

  return (
    <div className="w-100 post-bg d-flex flex-column p-3 justify-content-start align-items-start mb-1 border-bottom">
      <div className="w-100 d-flex flex-row gap-2 fw-normal justify-content-between align-items-center" style={{ fontSize: "15px" }}>
        <div className="text-start text-white">
          <span className="txt-secondary fw-bold">
            {notification.sender.name}{" "}
          </span>
          liked your post:{" "}
          <span 
            className="fw-bold clickable-link" 
            onClick={handleNotifClick}
            style={{ cursor: 'pointer', color: '#f5c2d6' }}
          >
            "{notification.paws.title}"
          </span>
        </div>
        <div className="txt-muted flex-shrink-0" style={{ fontSize: "11px" }}>
          <FontAwesomeIcon icon={faClockRotateLeft} className="me-1" />
          {timeAgo(notification.created_at)}
        </div>
      </div>
    </div>
  );
};

export default InboxItemLiked;
