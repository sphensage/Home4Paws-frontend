import React, { useState, useRef } from "react";
import "/src/stylesheets/new/homepage_new.css";
import "/src/stylesheets/new/createpost.css";
import { useAppStore } from "../../useAppStore";
import { updatePaw } from "../../api";

const EditPostForm = () => {
  const store = useAppStore();
  const paw = store.activePaw; 
  const formRef = useRef<HTMLFormElement>(null);
  
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!paw) {
    return <div className="p-5 text-center txt-muted">No post selected for editing.</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    // FB Validation logic
    const fbInput = form.querySelector("#postEditFacebook") as HTMLInputElement;
    fbInput.setCustomValidity("");
    let fbValue = fbInput.value.trim();
    if (fbValue && !fbValue.startsWith("http")) fbValue = "https://" + fbValue;
    const fbRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9.]{3,}\/?(\?id=\d+)?$/;

    if (fbValue && !fbRegex.test(fbValue)) {
      fbInput.setCustomValidity("Invalid");
    }

    form.classList.add("was-validated");

    if (!form.checkValidity()) return;

    setLoading(true);
    setErrorMsg("");

    // Prepare Multipart Data
    const formData = new FormData();
    formData.append("title", (form.querySelector("#postEditTitle") as HTMLInputElement).value);
    formData.append("description", (form.querySelector("#postEditDesc") as HTMLTextAreaElement).value);
    formData.append("location", (form.querySelector("#locSelect") as HTMLSelectElement).value);
    formData.append("fb_link", fbValue);

    // Append new photos if selected (this will replace old ones in backend logic)
    newFiles.forEach((file) => {
      formData.append("photos[]", file);
    });

    const result = await updatePaw(paw.paws_id, formData);

    if (result.success) {
      store.setSuccessMessage("Changes saved! 🐾");
      store.setActiveTab("home");
      store.fetchHomePaws(1);
      store.fetchStats();
    } else {
      setErrorMsg(result.message || "Failed to update post.");
    }
    setLoading(false);
  };

  return (
    <>
      <form
        id="editPostForm"
        ref={formRef}
        onSubmit={handleSubmit}
        className="p-3 w-100 d-flex flex-column gap-3 justify-content-start align-items-start hm-content needs-validation"
        style={{ height: "63vh", minHeight: "63vh", overflowY: "scroll" }}
        noValidate
      >
        <div className="w-100">
          <label className="txt-secondary fw-bold mb-1" htmlFor="postEditTitle">Post title</label>
          <input
            id="postEditTitle"
            type="text"
            className="form-control input-bg"
            defaultValue={paw.title}
            maxLength={30}
            required
          />
        </div>

        <div className="w-100">
          <label className="txt-secondary fw-bold mb-1" htmlFor="postEditDesc">Description</label>
          <textarea
            id="postEditDesc"
            className="form-control input-bg"
            rows={4}
            defaultValue={paw.description}
            maxLength={250}
            required
          />
        </div>

        <div className="w-100">
          <label className="txt-secondary fw-bold mb-1" htmlFor="locSelect">Location</label>
          <select id="locSelect" className="form-select input-bg" defaultValue={paw.location} required>
            <option value="Caloocan">Caloocan</option>
            <option value="Metro Manila">Metro Manila</option>
            <option value="Quezon City">Quezon City</option>
          </select>
        </div>

        {/* PHOTO SECTION */}
        <div className="w-100">
          <label className="txt-secondary fw-bold mb-1">Current Photos</label>
          <div className="d-flex gap-2 mb-2">
            {paw.photos.map((p, i) => (
              <img key={i} src={p.photo_url} className="rounded border" style={{ width: "60px", height: "60px", objectFit: "cover" }} alt="current" />
            ))}
          </div>
          
          <label className="txt-secondary fw-bold mb-1" htmlFor="postEditImages" style={{ color: "#af8598" }}>
            Replace Photos <span className="txt-muted fw-normal">(Optional)</span>
          </label>
          <input
            id="postEditImages"
            type="file"
            className="form-control input-bg"
            multiple
            accept="image/*"
            onChange={(e) => setNewFiles(e.target.files ? Array.from(e.target.files) : [])}
          />
          <div className="txt-muted mt-1" style={{ fontSize: "11px" }}>Uploading new photos will replace all existing ones.</div>
        </div>

        <div className="w-100 mb-2">
          <label className="txt-secondary fw-bold mb-1" htmlFor="postEditFacebook" style={{ color: "#6e8eff" }}>Facebook Link</label>
          <input
            id="postEditFacebook"
            type="url"
            className="form-control input-bg"
            defaultValue={paw.fb_link}
            required
          />
        </div>

        {errorMsg && <div className="alert alert-danger w-100 p-2 small">{errorMsg}</div>}
      </form>

      <div className="d-flex flex-row justify-content-end w-100 mt-2 gap-2">
        <button type="button" className="btn btn-secondary col-3" onClick={() => store.setActiveTab("home")}>Cancel</button>
        <button type="submit" form="editPostForm" className="col-3 btn btn-login" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </>
  );
};

export default EditPostForm;
