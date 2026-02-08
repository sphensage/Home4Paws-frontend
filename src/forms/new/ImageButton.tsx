import { useAppStore } from "../../useAppStore";

// 1. Define the props
interface ImageButtonProps {
  src?: string;
  onClick: () => void; // This prop is defined but not strictly necessary for the current logic
}

export const ImageButton = ({ src, onClick }: ImageButtonProps) => {
  // Pull actions from the store
  const setImageDisplay = useAppStore((state) => state.setImageDisplay);
  const setSelectedImageUrl = useAppStore((state) => state.setSelectedImageUrl);

  // This handler does the work of setting the state
  const handleClick = () => {
    if (src) {
      setSelectedImageUrl(src); // Tell the store which image to show
      setImageDisplay(true);    // Open the modal
    }
  };

  return (
    <button className="btn-invisible p-0 border-0" onClick={handleClick}>
      <img
        src={src || "https://via.placeholder.com"} // Use the passed src or a fallback
        className="rounded shadow-sm"
        style={{ width: "180px", height: "180px", objectFit: "cover" }}
        alt="Pet"
      />
    </button>
  );
};
