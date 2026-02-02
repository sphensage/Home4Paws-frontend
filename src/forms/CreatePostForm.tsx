// import React from 'react'

interface CreatePostFormProps {
  onClose?: () => void;
}

const CreatePostForm = ({ onClose }: CreatePostFormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    // Final form validity check:

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add("was-validated");
  };

  return (
    <form
      className="d-flex flex-column needs-validation"
      style={{ color: "#8b2e58" }}
      onSubmit={handleSubmit}
      noValidate
    >
      <h3 className="fw-bold">Create New Post</h3>
      <label htmlFor="postTitle" className="form-label mt-3">
        Post Title
      </label>
      <input
        id="postTitle"
        type="text"
        className="form-control"
        placeholder="What is the title of your post?"
        required
      ></input>
      <label htmlFor="postDescription" className="form-label mt-3">
        Post Description
      </label>
      <textarea
        id="postDescription"
        className="form-control"
        placeholder="What is your post all about?"
        rows={5}
        required
      ></textarea>
      <label htmlFor="postLocation" className="form-label mt-3">
        Location
      </label>
      <select
        id="postLocation"
        className="form-select"
        aria-label="Select Location"
        required
      >
        <option value="">-- Select location --</option>
        <option>Caloocan</option>
        <option>Metro Manila</option>
        <option>Quezon City</option>
      </select>
      <label htmlFor="postImage" className="form-label mt-3">
        Additional Pictures{" "}
        <span className="text-muted">(Optional, 3 maximum)</span>
      </label>
      <input
        type="file"
        className="form-control"
        id="postImage"
        multiple
        accept="image/*"
      />
      <div className="d-flex flex-row gap-2 mt-4 w-100 justify-content-between justify-content-md-start">
        <button
          className="btn btn-secondary col-6 col-md-2"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
        <button className="btn btn-primary col-6 col-md-2" type="submit">
          Post
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
