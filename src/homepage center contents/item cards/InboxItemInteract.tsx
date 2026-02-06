import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import type { InboxNotification } from "../../api";

const InboxItemInteract = ({
  notification,
}: {
  notification: InboxNotification;
}) => {
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

  return (
    <button className="btn-invisible w-100 post-bg d-flex flex-column fs-5 p-3 justify-content-start align-items-start">
      <div
        className="w-100 d-flex flex-row gap-2 fw-normal justify-content-between align-items-center"
        style={{ fontSize: "15px" }}
      >
        <div id="inboxTitle">
          <span className="txt-secondary fw-bold">
            {notification.sender.name}{" "}
          </span>
          interacted with your contacts for{" "}
          <span className="fw-bold">"{notification.paws.title}"</span>!
        </div>
        <div className="txt-muted" style={{ fontSize: "11px" }}>
          <FontAwesomeIcon icon={faClockRotateLeft} className="me-1" />
          {timeAgo(notification.created_at)}
        </div>
      </div>
    </button>
  );
};

export default InboxItemInteract;
