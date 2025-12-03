import type React from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div style={styles.wrapper} onClick={onClose}>
      <div style={styles.toast}>{message}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 9999,
  },
  toast: {
    backgroundColor: "#1f2937",
    color: "white",
    padding: "10px 16px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Toast;
