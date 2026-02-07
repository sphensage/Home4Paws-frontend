import { useAppStore } from "../../useAppStore";

export const ImageButton = () => {
  const setImageDisplay = useAppStore((state) => state.setImageDisplay);
  return (
    <button className="btn-invisible" onClick={() => setImageDisplay(true)}>
      <img
        src="Home4Paws-frontend\src\assets\pet_img4.jpg"
        className="rounded"
        style={{ width: "180px", height: "180px", objectFit: "cover" }}
      />
    </button>
  );
};
