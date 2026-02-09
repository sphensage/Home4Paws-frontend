import {
  faClockRotateLeft,
  faHeart,
  faPaw,
  faUser,
  faTrash,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "/src/stylesheets/new/homepage_new.css";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { ImageButton } from "../forms/new/ImageButton";
import { useAppStore } from "../useAppStore";
import { logFacebookVisit } from "../api";

const MySwal = withReactContent(Swal);

/* ---------------- SweetAlert Base Config ---------------- */
const swalBaseConfig = {
  background: "#3b1b2c",
  color: "#f1e9ee",
  iconColor: "#f5c2d6",
  confirmButtonColor: "#198754",
  cancelButtonColor: "#6c757d",
  showCancelButton: true,
  reverseButtons: true,
  buttonsStyling: true,
  customClass: {
    popup: "rounded-4 shadow-lg",
    confirmButton: "fw-bold px-4",
    cancelButton: "fw-bold px-4",
    title: "fw-bold",
  },
};

/* -------- Image Gallery Sub-Component -------- */
interface ImageGalleryProps {
  photos: { photo_url: string }[];
  handleImageClick: (url: string, index: number) => void;
}

const ImageGallery = ({ photos, handleImageClick }: ImageGalleryProps) => {
  return (
    <div className="w-100 d-flex flex-wrap gap-3">
      {photos.map((photo, index) => (
        <div key={index} style={{ flex: "1 0 180px", maxWidth: "180px" }}>
          <ImageButton
            src={photo.photo_url}
            onClick={() => handleImageClick(photo.photo_url, index)}
          />
        </div>
      ))}
    </div>
  );
};

const ViewPost = () => {
  /* -------- Store State -------- */
  const paw = useAppStore((state) => state.activePaw);
  const user = useAppStore((state) => state.user);
  const handleLike = useAppStore((state) => state.handleLike);
  const handleAdoptAction = useAppStore((state) => state.handleAdopt);
  const handleDeleteAction = useAppStore((state) => state.handleDelete);
  const setSelectedImageUrl = useAppStore((state) => state.setSelectedImageUrl);
  const setImageDisplay = useAppStore((state) => state.setImageDisplay);
  const setCurrentImageIndex = useAppStore((state) => state.setCurrentImageIndex);
  const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  /* -------- Logic -------- */
  const isAuthenticated = !!user;
  const isOwner = user && paw && Number(user.id) === Number(paw.user_id);
  const isAdopted = paw?.status === "adopted";
  
  // Checks if the current user's ID is in the reactions array
  const hasLiked = paw?.reactions?.some(
    (r) => Number(r.user_id) === Number(user?.id),
  );

  

  /* -------- Handlers -------- */
    const onFacebookClick = async () => {
    // 1. Guest Check
    if (!isAuthenticated) {
      setSuccessMessage("Please login to visit Facebook profiles! 🐾");
      return;
    }

    // 2. Adoption Check (Prevents logged-in users from clicking)
    if (isAdopted) {
      setSuccessMessage("This pet has already been adopted! 🐾");
      return;
    }
    
    // 3. Link Check & Action
    if (paw?.fb_link) {
      window.open(paw.fb_link, "_blank", "noopener,noreferrer");
      if (!isOwner) await logFacebookVisit(paw.paws_id);
    }
  };


  const onAdoptClick = async () => {
    if (!paw) return;
    const result = await MySwal.fire({
      ...swalBaseConfig,
      icon: "question",
      title: "Mark post as adopted?",
      html: `<p style="font-size:14px;color:#e6d6dd">Marking <strong>${paw.title}</strong> as adopted.</p>`,
      confirmButtonText: "Yes, mark adopted",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await handleAdoptAction(paw.paws_id);
      setSuccessMessage("Post marked as adopted.");
    }
  };

  const onDeleteClick = async () => {
    if (!paw) return;
    const result = await MySwal.fire({
      ...swalBaseConfig,
      icon: "warning",
      title: "Delete this post?",
      html: `<p style="font-size:14px;color:#e6d6dd">Deleting <strong>${paw.title}</strong>. This cannot be undone.</p>`,
      confirmButtonText: "Delete post",
      confirmButtonColor: "#dc3545",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await handleDeleteAction(paw.paws_id);
      setSuccessMessage("Post deleted.");
      setActiveTab("home");
    }
  };

  const handleImageClick = (url: string, index: number) => {
    setSelectedImageUrl(url);
    setCurrentImageIndex(index);
    setImageDisplay(true);
  };

  if (!paw) {
    return <div className="p-5 text-center txt-muted hm-content">Select a post to view details</div>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="txt-main-label fw-bold fs-4">View Post</div>
      </div>

      <div className="p-3 w-100 d-flex flex-column gap-1 hm-content" style={{ height: "60vh", minHeight: "60vh", overflowY: "scroll" }}>
        <div className="d-flex flex-row gap-3 fw-bold align-items-center" style={{ fontSize: "19px" }}>
          {paw.title}
          <div  className={`fw-normal ${isOwner ? "txt-success" : "post-user"}`} style={{ fontSize: "14px" }}>
            <FontAwesomeIcon icon={faUser} size="xs" className="me-2" />
            {paw.user?.name || "Unknown User"}
          </div>
          <span className={`badge text-white ${isAdopted ? 'text-bg-warning' : 'text-bg-success'}`} style={{ fontSize: "10px" }}>
            {isAdopted ? 'Adopted' : 'Open'}
          </span>
        </div>

        <div className="txt-secondary fw-normal mb-1">
          <FontAwesomeIcon icon={faCompass} size="sm" /> {paw.location || "Location not specified"}
        </div>

        <div className="txt-muted fw-normal mb-2" style={{ fontSize: "13px" }}>
          <FontAwesomeIcon icon={faClockRotateLeft} size="sm" /> {new Date(paw.created_at).toLocaleDateString()}
        </div>

        <div className="mb-5" style={{ fontSize: "15px" }}>{paw.description}</div>
        <div className="mb-2 txt-muted" style={{ fontSize: "12px" }}>Images:</div>
        <ImageGallery photos={paw.photos} handleImageClick={handleImageClick} />
      </div>

      <div className="w-100 d-flex flex-row align-items-center gap-2">
        <button
          type="button"
          onClick={onFacebookClick}
          className={`btn col-4 btn-facebook fw-bold d-flex align-items-center gap-2 justify-content-center ${(!isAuthenticated || isAdopted || !paw.fb_link) ? "opacity-50" : ""}`}
        >
          Facebook <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
        </button>

        {isOwner && !isAdopted && (
          <button type="button" onClick={onAdoptClick} className="btn col-4 btn-success fw-bold d-flex align-items-center gap-2 justify-content-center">
            Mark Adopted <FontAwesomeIcon icon={faPaw} size="lg" />
          </button>
        )}

        {isOwner && !isAdopted && (
          <button 
            type="button" 
            className="btn btn-outline-info fw-bold d-flex align-items-center gap-2 px-3"
            onClick={() => setActiveTab("edit_post")}
          >
            Edit <FontAwesomeIcon icon={faPaw} />
          </button>
        )}
       

        {isOwner && (
          <button type="button" onClick={onDeleteClick} className="btn btn-outline-danger fw-bold d-flex align-items-center gap-2 px-3">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
          <button
            type="button"
            className={`btn btn-invisible ${hasLiked ? "txt-liked" : "txt-muted"}`}
            onClick={() => {
              // 1. Guest Check
              if (!isAuthenticated) {
                setSuccessMessage("Please login to like posts! 🐾");
                return;
              }
               if (isOwner) {
                setSuccessMessage("You cannot like your own post! 🐾");
                return;
              }
              // 2. Already Liked Check
              if (hasLiked) {
                setSuccessMessage("You have already liked this post! ❤️");
                return;
              }

              // 3. Normal Like Logic
              handleLike(paw.paws_id, user?.id);
            }}
          >
            <FontAwesomeIcon icon={faHeart} size="lg" /> {paw.reactions_count}
          </button>
      </div>
    </div>
  );
};

export default ViewPost;
