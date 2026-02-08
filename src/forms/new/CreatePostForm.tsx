import React, { useState, useRef } from "react";
import "/src/stylesheets/new/homepage_new.css";
import "/src/stylesheets/new/createpost.css";
import { useAppStore } from "../../useAppStore";
import { createPaw } from "../../api";

const CreatePostForm = () => {
  const store = useAppStore();
  const formRef = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    // 1. Reset custom validity before re-checking
    const fbInput = form.querySelector(
      "#postCreateFacebook",
    ) as HTMLInputElement;
    fbInput.setCustomValidity("");

    // 2. FB Regex Validation
    let fbValue = fbInput.value.trim();
    if (fbValue && !fbValue.startsWith("http")) fbValue = "https://" + fbValue;
    const fbRegex =
      /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9.]{3,}\/?(\?id=\d+)?$/;

    if (fbValue && !fbRegex.test(fbValue)) {
      fbInput.setCustomValidity("Invalid");
    }

    // 3. Trigger Red UI
    form.classList.add("was-validated");

    // 4. Final Validation Check
    if (!form.checkValidity() || files.length === 0) {
      if (files.length === 0) setErrorMsg("At least one image is required!");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(form);
    const result = await createPaw({
      title: formData.get("postCreateTitle"),
      description: formData.get("postCreateDesc"),
      location: formData.get("location"),
      fb_link: fbValue,
      photos: files,
    });

    if (result.success) {
      store.setSuccessMessage("Successfully posted! 🐾");
      store.setActiveTab("home");
      store.fetchHomePaws(1);
    } else {
      setErrorMsg(result.message || "Failed to create post.");
    }
    setLoading(false);
  };

  return (
    <>
      <form
        id="createPostForm"
        ref={formRef}
        onSubmit={handleSubmit}
        className="p-3 w-100 d-flex flex-column gap-3 justify-content-start align-items-start hm-content needs-validation"
        style={{ height: "63vh", minHeight: "63vh", overflowY: "scroll" }}
        noValidate
      >
        <div className="w-100">
          <label
            className="txt-secondary fw-bold mb-1"
            htmlFor="postCreateTitle"
          >
            Post title{" "}
            <span className="txt-muted fw-normal">(30 characters max)</span>
          </label>
          <input
            name="postCreateTitle"
            id="postCreateTitle"
            type="text"
            className="form-control input-bg" // Added form-control for red border
            style={{ paddingLeft: "10px" }}
            placeholder="What will be your post title?"
            maxLength={30}
            required
            onInput={(e) => e.currentTarget.setCustomValidity("")}
          />
          <div className="invalid-feedback">Title is required!</div>
        </div>

        <div className="w-100">
          <label
            className="txt-secondary fw-bold mb-1"
            htmlFor="postCreateDesc"
          >
            Post Description{" "}
            <span className="txt-muted fw-normal">(250 characters max)</span>
          </label>
          <textarea
            name="postCreateDesc"
            id="postCreateDesc"
            className="form-control input-bg flex-shrink-0" // Added form-control for red border
            style={{ paddingLeft: "10px" }}
            rows={5}
            placeholder="What will your post be about?"
            maxLength={250}
            required
            onInput={(e) => e.currentTarget.setCustomValidity("")}
          />
          <div className="invalid-feedback">Description is required!</div>
        </div>

        <div className="w-100">
          <label className="txt-secondary fw-bold mb-1" htmlFor="locSelect">
            Your Location
          </label>
          <select
            name="location"
            id="locSelect"
            className="form-select input-bg w-100" // Changed to form-select for red border
            style={{ paddingLeft: "10px", height: "38px" }}
            required
            onInput={(e) => e.currentTarget.setCustomValidity("")}
            defaultValue=""
          >
            <option value="" disabled>
              Select your location
            </option>
            <option value="Caloocan">Caloocan</option>
            <option value="Metro Manila">Metro Manila</option>
            <option value="Quezon City">Quezon City</option>
          </select>
          <div className="invalid-feedback">Please select a location!</div>
        </div>

        <div className="w-100">
          <label
            className="txt-secondary fw-bold mb-1"
            htmlFor="postCreateImages"
            style={{ color: "#af8598" }}
          >
            Attach Image/s{" "}
            <span className="txt-muted fw-normal">(1 image min, 3 max)</span>
          </label>
          <input
            id="postCreateImages"
            type="file"
            className="form-control input-bg"
            multiple
            accept="image/*"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setFiles(target.files ? Array.from(target.files) : []);
              target.setCustomValidity("");
            }}
            required
          />
          <div className="invalid-feedback">
            At least one image is required!
          </div>
        </div>

        <div className="w-100 mb-2">
          <label
            className="txt-secondary fw-bold mb-1"
            htmlFor="postCreateFacebook"
            style={{ color: "#6e8eff" }}
          >
            Your Facebook account{" "}
            <span className="txt-muted fw-normal">
              (Valid profile link only)
            </span>
          </label>
          <input
            name="postCreateFacebook"
            id="postCreateFacebook"
            type="url"
            className="form-control input-bg" // Added form-control for red border
            style={{ paddingLeft: "10px" }}
            placeholder="https://www.facebook.com..."
            required
            onInput={(e) => {
              e.currentTarget.setCustomValidity("");
              setErrorMsg("");
            }}
          />
          <div className="invalid-feedback">
            A valid Facebook link is required!
          </div>
        </div>

        {errorMsg && (
          <div className="alert alert-danger w-100 p-2 small">{errorMsg}</div>
        )}
      </form>

      <div className="d-flex flex-row justify-content-end w-100 mt-2">
        <button
          type="submit"
          form="createPostForm"
          className="col-3 btn btn-login"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </>
  );
};

export default CreatePostForm;
