// src/pages/ForumInbox.tsx
import React, { useEffect, useState } from "react";
import ForumInboxItem from "../forum item/ForumInboxItem.tsx";
import { getInboxNotifications } from "../../api.ts"; 
import type { InboxNotification } from "../../api";

const ForumInbox = () => {
  // 1. Initialize with an empty array to satisfy TypeScript
  const [notifications, setNotifications] = useState<InboxNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      const response = await getInboxNotifications();
      
      if (response.success) {
        // FIX: The '?? []' ensures we never pass 'undefined' to the state
        setNotifications(response.notifications ?? []);
      } else {
        // FIX: The '??' ensures we never pass 'undefined' to the error state
        setError(response.message ?? "Failed to fetch notifications");
      }
      setIsLoading(false);
    };

    fetchNotifications();
  }, []); 

  return (
    <div style={{ height: "100%" }}>
      {/* Header design from your image */}
      <div style={{ background: '#800040', color: 'white', padding: '1rem', borderRadius: '7px 7px 0 0' }}>
        Inbox history
      </div>

      <div
        id="inboxesContainer"
        className="d-flex flex-column w-100 mt-4 gap-3"
        style={{
          overflowY: "auto",
          height: "370px",
        }}
      >
        {isLoading ? (
          <p className="text-center mt-4 text-white">Loading notifications...</p>
        ) : error ? (
          <p className="text-center mt-4 text-danger">{error}</p>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <ForumInboxItem 
                key={notification.id} 
                notification={notification} 
            />
          ))
        ) : (
          <p className="text-center mt-4 text-white">Your inbox is empty.</p>
        )}
      </div>
    </div>
  );
};

export default ForumInbox;

