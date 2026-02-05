import { useState } from "react";
import { useAuth } from "../AuthContext";
import { createPaw } from "../api";
import { useAppStore } from "../useAppStore";

interface CreatePostFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const CreatePostForm = ({ onClose, onSuccess }: CreatePostFormProps) => {
  const { user } = useAuth();
  const setSuccessMessage = useAppStore((state) => state.setSuccessMessage); 
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  // New state for files
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      
      // Validation: Min 1, Max 3
      if (selectedFiles.length > 3) {
        setError("You can only upload a maximum of 3 photos.");
        e.target.value = ""; // Reset input
        setPhotos([]);
        return;
      }
      
      setError(""); // Clear error if count is okay
      setPhotos(selectedFiles);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Custom check for at least 1 photo
    if (photos.length === 0) {
      setError("Please upload at least 1 photo.");
      return;
    }

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    form.classList.add("was-validated");
    setError("");
    setLoading(true);

    try {
      // Pass the photos array to the refactored api function
      const result = await createPaw({
        title,
        description,
        location,
        photos, 
      });

      if (result.success) {
        setSuccessMessage("Post created successfully!");
        if (onSuccess) onSuccess();
        onClose();
      } else {
        setError(result.message || "Failed to create post");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center p-4">
        <p>Please <a href="/login">login</a> to create a post.</p>
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <form
      className="d-flex flex-column needs-validation"
      style={{ color: "#8b2e58" }}
      onSubmit={handleSubmit}
      noValidate
    >
      <h3 className="fw-bold">Create New Post</h3>
      
      {error && <div className="alert alert-danger">{error}</div>}

      <label htmlFor="postTitle" className="form-label mt-3">Post Title</label>
      <input
        id="postTitle"
        type="text"
        className="form-control"
        placeholder="What is the title of your post?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="postDescription" className="form-label mt-3">Post Description</label>
      <textarea
        id="postDescription"
        className="form-control"
        placeholder="What is your post all about?"
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label htmlFor="postLocation" className="form-label mt-3">Location</label>
      <select
        id="postLocation"
        className="form-select"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      >
        <option value="">-- Select location --</option>
        <option value="Caloocan">Caloocan</option>
        <option value="Metro Manila">Metro Manila</option>
        <option value="Quezon City">Quezon City</option>
      </select>

      <label htmlFor="postImage" className="form-label mt-3">
        Pictures <span className="text-muted">(1 - 3 required)</span>
      </label>
      <input
        type="file"
        className="form-control"
        id="postImage"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        required // Frontend browser validation
      />

      <div className="d-flex flex-row gap-2 mt-4 w-100 justify-content-between justify-content-md-start">
        <button
          className="btn btn-secondary col-6 col-md-2"
          type="button"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
        <button 
          className="btn btn-primary col-6 col-md-2" 
          type="submit"
          disabled={loading}

        >
          {loading ? "Posting..." : "Post"}

        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
