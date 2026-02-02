import InboxItemPlaceholder from "./inboxItemPlaceholder";
import PostItemPlaceholder from "./postItemPlaceholder";

interface Props {
  type: string;
}

const ListPlaceholder = ({ type }: Props) => {
  return (
    <div
      id="postsContainer"
      className="d-flex flex-column w-100 mt-4 gap-3"
      style={{
        overflowY: "auto",
        // backgroundColor: "black",
        height: "385px",
      }}
    >
      {type === "inbox" ? (
        <>
          <InboxItemPlaceholder />
          <InboxItemPlaceholder />
          <InboxItemPlaceholder />
          <InboxItemPlaceholder />
        </>
      ) : (
        <>
          <PostItemPlaceholder />
          <PostItemPlaceholder />
          <PostItemPlaceholder />
          <PostItemPlaceholder />
        </>
      )}
    </div>
  );
};

export default ListPlaceholder;
