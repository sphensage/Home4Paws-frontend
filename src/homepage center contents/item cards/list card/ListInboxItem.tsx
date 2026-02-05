import React from "react";
import InboxItem from "../InboxItemLiked";
import InboxItemInteract from "../InboxItemInteract";

const ListInboxItem = () => {
  return (
    <div
      className="d-flex flex-column gap-2"
      style={{ height: "75vh", minHeight: "75vh", overflowY: "scroll" }}
    >
      <InboxItem />
      <InboxItemInteract />
      <InboxItem />
      <InboxItem />
      <InboxItemInteract />
      <InboxItem />
      <InboxItem />
    </div>
  );
};

export default ListInboxItem;
