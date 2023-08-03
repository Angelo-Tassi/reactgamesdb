import React, { useState } from "react";
import ScreenshotOverlay from "./screenshots";

function GameOverlay({ game, onCloseOverlay }) {
  const [clickedOnce, setClickedOnce] = useState(false);
  const [enlargedScreenshot, setEnlargedScreenshot] = useState(null);

  const handleScreenshotClick = (imageUrl) => {
    setEnlargedScreenshot(imageUrl);
    setClickedOnce(true);
  };

  const handleOverlayClick = () => {
    setClickedOnce(false);
    setTimeout(() => setEnlargedScreenshot(null), 300);
    if (!clickedOnce) {
      onCloseOverlay();
    }
  };

  return (
    <div
      className={`overlay ${clickedOnce ? "clicked-once" : ""}`}
      onClick={handleOverlayClick}
    >
      {enlargedScreenshot && (
        <ScreenshotOverlay
          imageUrl={enlargedScreenshot}
          onCloseOverlay={handleOverlayClick}
        />
      )}
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <div className="info">
          <div>
            <h2 className="title">{game.name}</h2>
            <br></br>
            <h4 className="description">Released: {game.released}</h4>
            <br></br>
            <h3 className="bold">Screenshots:</h3>
            <div>
              {game.short_screenshots.map((image, id) => (
                <img
                  key={id.id}
                  className="photo"
                  src={image.image}
                  alt={id.id}
                  onClick={() => handleScreenshotClick(image.image)}
                />
              ))}
            </div>
            <div className="bold">Platforms:</div>
            <h6 className="platform">
              {game.platforms.map((platform) => `${platform.platform.name} `)}
            </h6>
            <div className="metacritic bold">Metacritic:</div>
            <h6 className="overlay-rating">
              {game.metacritic !== null ? game.metacritic : "N/A"}
            </h6>
            <br></br>
            <div className="bold">Genre:</div>
            <br></br>
            <h6 className="description">
              {game.genres.map((genres) => `${genres.name} `)}
            </h6>
          </div>
          <div>
            <h3 className="bold">Description:</h3>
            <p className="description">
              {game.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ipsum ac justo elementum aliquam. Vestibulum ante ipsumprimis in faucibus orci luctus et ultrices posuere cubilia Curae In hac habitasse platea dictumst. Nulla facilisi. Mauris sed purusvitae odio ullamcorper dictum quis quis eros. Duis ac odio velorci finibus rhoncus."}
            </p>
            <h3 className="bold">Game History:</h3>
            <p className="history">
              {/* Place your game history placeholder text here */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              quis ipsum ac justo elementum aliquam. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia Curae;
              In hac habitasse platea dictumst. Nulla facilisi. Mauris sed purus
              vitae odio ullamcorper dictum quis quis eros. Duis ac odio vel
              orci finibus rhoncus.
            </p>
          </div>
        </div>
        <button className="close-btn" onClick={onCloseOverlay}>
          Close
        </button>
      </div>
    </div>
  );
}

export default GameOverlay;
