import React from "react";
import InboxItemLiked from "../InboxItemLiked";
import InboxItemInteract from "../InboxItemInteract";
import { useAppStore } from "../../../useAppStore";

const ListInboxItem = () => {
  const notifications = useAppStore((state) => state.inboxNotifications);

  return (
    <div
      className="d-flex flex-column gap-2"
      style={{ height: "75vh", minHeight: "75vh", overflowY: "scroll" }}
    >
      {notifications.length > 0 ? (
        notifications.map((notif) => (
          notif.type === "like" ? (
            <InboxItemLiked key={notif.id} notification={notif} />
          ) : (
            <InboxItemInteract key={notif.id} notification={notif} />
          )
        ))
      ) : (
        <div className="text-center mt-5 txt-muted">No notifications yet.</div>
      )}
    </div>
  );
};

export default ListInboxItem;
