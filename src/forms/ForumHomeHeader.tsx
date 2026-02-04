const ForumHomeHeader = () => {
  return (
    <div
      className="d-flex flex-row w-100 py-3 mb-1"
      style={{ backgroundColor: "#8b2e58", borderRadius: "7px" }}
    >
      <div className="text-white col-6 ps-4">
        <p className="mb-0">Posts</p>
      </div>
      <div className="d-flex flex-row col-6">
        <div className="text-white col-6 text-center">
          <p className="mb-0">Since posted</p>
        </div>
        <div className="text-white col-6 text-center">
          <p className="mb-0">Likes</p>
        </div>
      </div>
    </div>
  );
};

export default ForumHomeHeader;
