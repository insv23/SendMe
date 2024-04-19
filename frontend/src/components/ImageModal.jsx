import React from "react";

const ImageModal = ({ isOpen, imageUrl, alt, onClick }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={alt}
        style={{ maxWidth: "90%", maxHeight: "90%" }}
      />
    </div>
  );
};

export default ImageModal;
