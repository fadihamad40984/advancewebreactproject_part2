import React, { useState, useEffect } from "react";

const Popup = ({ isVisible, onClose, village }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10); 
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => setShouldRender(false), 300); 
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div className="popup show">
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <h2>Village Details</h2>
      <p><strong>Village Name:</strong> {village.villageName}</p>
      <p><strong>Region/District:</strong> {village.region}</p>
      <p><strong>Land Area (sq km):</strong> {village.landArea}</p>
      <p><strong>Latitude:</strong> {village.latitude}</p>
      <p><strong>Longitude:</strong> {village.longitude}</p>
      <p><strong>Tags:</strong> {village.tags}</p>
      <img
        src={village.image_path || "https://placehold.co/100*100"} 
        alt={`Image of ${village.villageName}`}
        id="villageImageView"
      />
    </div>
  );
};

export default Popup;
