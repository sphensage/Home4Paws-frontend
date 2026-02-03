// import React from 'react'

const PostDisplay = () => {
  return (
    <div className="d-flex flex-column justify-content-start">
      <h3 className="fw-bold">
        Post Name
        <span className="ms-3 text-muted fs-5 fw-normal">post by username</span>
      </h3>
      <label htmlFor="itemDescription" className="form-label fs-4 mt-3">
        Post description here blah blah blah blah blah blah
      </label>
      <div className="d-flex flow-row justify-content-center justify-content-md-start">
        <button type="button" className="col-6 col-md-3 btn btn-success mt-3">
          Copy user email
        </button>
        <button
          type="button"
          className="col-6 col-md-3 btn ms-3 btn-primary mt-3"
        >
          Like this post
        </button>
      </div>
    </div>
  );
};

export default PostDisplay;
