import type { PawsListing } from "../../api"; 

interface PostDisplayProps {
  paw: PawsListing | null; // Allow null for safety
}

const PostDisplay = ({ paw }: PostDisplayProps) => {
  // Logic for the Copy Email button
  const handleCopyEmail = () => {
    const email = paw?.user?.email;
    if (email) {
      navigator.clipboard.writeText(email);
      alert("Email copied to clipboard!");
    } else {
      alert("No email available for this user.");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-start">
      <h3 className="fw-bold">
        {/* Default to "Post Details" if title is missing */}
        {paw?.title || "Post Details"}
        <span className="ms-3 text-muted fs-5 fw-normal">
          post by {paw?.user?.name || "Anonymous User"}
        </span>
      </h3>
      
      <p className="fs-5 mt-3" style={{ whiteSpace: "pre-wrap", color: "#444" }}>
        {/* Default to a placeholder description if empty */}
        {paw?.description || "No description provided for this post."}
      </p>

      <div className="d-flex flex-row justify-content-center justify-content-md-start gap-2">
        <button 
          type="button" 
          className="col-6 col-md-4 btn btn-success mt-3"
          onClick={handleCopyEmail}
          disabled={!paw?.user?.email} // Disable if no email exists
        >
          Copy user email
        </button>
        <button
          type="button"
          className="col-6 col-md-4 btn btn-primary mt-3"
        >
          Like this post
        </button>
      </div>
    </div>
  );
};

export default PostDisplay;
