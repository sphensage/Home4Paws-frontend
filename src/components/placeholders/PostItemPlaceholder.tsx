// import React from 'react'

  const PostItemPlaceholder = () => {
    return (
      // PLACEHOLDER CARD, use typescript to actually display the items !!!
      <button
        id="postItem"
        className="d-flex flex-row justify-content-between align-items-center w-100 flex-shrink-0 placeholder-glow"
        style={{
          border: "none",
          backgroundColor: "white",
          borderRadius: "7px",
          height: "4.5rem",
        }}
      >
      <div className="col-6 d-flex flex-row justify-content-start align-items-center">
        <div
          id="profileIconBox"
          className="d-flex ms-4 justify-content-center align-items-center placeholder bg-dark"
          style={{ backgroundColor: "white", width: "35px", height: "35px" }}
        />
        <div
          id="postDescription"
          className="mx-3 col-6 placeholder bg-dark"
        ></div>
      </div>
      <div className="d-flex flex-row col-6 justify-content-around">
        <div id="datePosted" className="mx-3 col-3 placeholder bg-dark"></div>
        <div id="likes" className="mx-3 col-3 placeholder bg-dark"></div>
      </div>
    </button>
  );
};

export default PostItemPlaceholder;
