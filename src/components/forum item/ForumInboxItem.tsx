import React from 'react';
import type { InboxNotification } from "../../api.ts"; 
import { useAppStore } from "../../useAppStore.ts"

interface Props {
  notification: InboxNotification; // This now includes the 'type'
}

const ForumInboxItem = ({ notification }: Props) => {
  // Logic to format time to "7m ago" or "2h ago"
  const setPostDisplay = useAppStore((state) => state.setPostDisplay)

  const getTimeAgo = (dateString: string) => {
    const time = new Date(dateString).getTime();
    const now = new Date().getTime();
    const diff = Math.floor((now - time) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(dateString).toLocaleDateString();
  };
   const formatNotification = (message: string) => {
    const words = message.split(" ");

      const fullName = words.slice(0, 2).join(" ");
    const action = words.slice(2).join(" ");

    
return (
      <div
        id="inboxDescription"
        className="text-black text-start text-truncate"
        style={{ marginLeft: "1rem" }}
      >
        <span className="fw-bold">{fullName}</span>
        <span className="fw-normal"> {action}</span>
      </div>
    );
  };

  return (
    <button
      id="inboxItem"
      className="d-flex flex-row align-items-center w-100 flex-shrink-0 px-3"
      style={{
        border: "none",
        backgroundColor: "white",
        borderRadius: "7px",
        height: "4.5rem",
      }}
      onClick={() => setPostDisplay(true)}
    >
      {/* 1. Content Area (Alignment Fixed) */}
      <div className="flex-grow-1 d-flex align-items-center overflow-hidden">
        {formatNotification(notification.message)}
      </div>

      {/* 2. Time Area */}
      <div className="ms-auto flex-shrink-0 text-end">
        <div className="text-muted" style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}>
          {getTimeAgo(notification.created_at)}
        </div>
      </div>
    </button>
  );
};

export default ForumInboxItem;
