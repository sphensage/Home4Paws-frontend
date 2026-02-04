import React from 'react';
import type { InboxNotification } from "../../api.ts"; 

interface Props {
  notification: InboxNotification; // This now includes the 'type'
}

const ForumInboxItem = ({ notification }: Props) => {
  // Logic to format time to "7m ago" or "2h ago"
  const getTimeAgo = (dateString: string) => {
    const time = new Date(dateString).getTime();
    const now = new Date().getTime();
    const diff = Math.floor((now - time) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div
      id="inboxItem"
      className="d-flex flex-row justify-content-between align-items-center w-100 flex-shrink-0"
      style={{
        border: "none",
        backgroundColor: "white",
        borderRadius: "7px",
        height: "4.5rem",
      }}
    >
      <div className="col-9 d-flex flex-row justify-content-start align-items-center">
        <div
          id="profileIconBox"
          className="d-flex ms-4 justify-content-center align-items-center flex-shrink-0"
          style={{ 
            backgroundColor: notification.type === 'like' ? "black" : "#555", 
            width: "35px", 
            height: "35px" 
          }}
        >
          <img src="/src/assets/user_icon.svg" alt="user icon" style={{ width: '20px' }} />
        </div>
        <div
          id="inboxDescription"
          className="mx-3 col-8 text-black fw-bold"
        >
          {/* This displays: "User liked your post" or "User copied your email" */}
          {notification.message}
        </div>
      </div>
      
      <div className="col-3 d-flex justify-content-end pe-4">
        <div className="text-muted" style={{ fontSize: '0.85rem' }}>
          {getTimeAgo(notification.created_at)}
        </div>
      </div>
    </div>
  );
};

export default ForumInboxItem;
