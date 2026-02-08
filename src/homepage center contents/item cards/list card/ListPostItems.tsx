import { PostItem } from "../PostItem";
import { useAppStore } from "../../../useAppStore"; // Adjust the path as necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";

const ListPostItems = () => {
  // Get the list of pets and the loading status from the store
  const paws = useAppStore((state) => state.paws);
  const loading = useAppStore((state) => state.loading);
  

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-start mt-5"
        style={{ height: "70vh" }}
      >
        <div className="spinner-border txt-muted" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (paws.length === 0) {
    return (
      <div className="d-flex gap-3 flex-column align-items-center justify-content-start mt-5">
        <FontAwesomeIcon icon={faFaceFrown} size="4x" className="txt-muted" />
        <div className="txt-muted">No posts found matching your criteria.</div>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column gap-2"
      style={{ height: "75vh", minHeight: "75vh", overflowY: "auto" }}
    >
      {/* Map over the actual data and pass each pet object to the PostItem component */}
      {paws.map((paw) => (
        <PostItem key={paw.paws_id} paw={paw} />
      ))}
    </div>
  );
};

export default ListPostItems;
