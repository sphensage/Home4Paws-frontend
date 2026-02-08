import { useAppStore } from "./useAppStore";

export const SuccessToast = () => {
  const message = useAppStore((state) => state.successMessage);

  if (!message) return null;

  return (
    <div 
      className="position-fixed top-0 start-50 translate-middle-x mt-4 shadow-lg p-3 text-white fw-bold toast-animate"
      style={{
        zIndex: 10000,
        backgroundColor: "rgba(139, 46, 88, 0.95)",
        backdropFilter: "blur(4px)",
        borderRadius: "12px",
        minWidth: "320px",
        textAlign: "center",
        border: "1px solid rgba(255,255,255,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px"
      }}
    >
      <span style={{ fontSize: "1.2rem" }}>🐾</span>
      {message}
    </div>
  );
};
