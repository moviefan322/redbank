import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  } as React.CSSProperties,
  modal: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "5px",
    width: "50vw", // Use a percentage of the viewport width
    maxHeight: "100vh", // Adjusted for potential padding/margin outside the modal
    overflowY: "auto", // Adds scroll for content exceeding the modal's height
    position: "relative",
  } as React.CSSProperties,
  closeButton: {
    position: "absolute",
    top: "-5px",
    right: "0px",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  } as React.CSSProperties,
};

export default Modal;
