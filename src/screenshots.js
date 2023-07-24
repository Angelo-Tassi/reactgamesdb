import React from 'react';

function ScreenshotOverlay({ imageUrl, onCloseOverlay }) {
  return (
    <div className="screenshot-overlay" onClick={onCloseOverlay}>
      <div className="screenshot-content">
        <img
          className="enlarged-photo"
          src={imageUrl}
          alt="Enlarged Screenshot"
        />
      </div>
    </div>
  );
}

export default ScreenshotOverlay;
