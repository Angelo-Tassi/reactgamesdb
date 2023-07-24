// App.js

import React, { useState, useEffect } from 'react';
import GameOverlay from './gameoverlay';

import './index.css';

function App() {
  const [platform, setPlatform] = useState(166);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [platformsNames, setPlatformsName] = useState([]);
  const [options, setOptions] = useState([]);
  const [name, selectPlatformName] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/platforms?key=73601ec88eab474386a6952aa8b34734`
    )
      .then((response) => response.json())
      .then((data) => {
        const platformsNames = data.results;
        console.log('fetched platforms:', platformsNames);
        setPlatformsName(platformsNames);
        const dropDownOptions = platformsNames.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ));
        console.log('options', dropDownOptions);
        setOptions(dropDownOptions);
      })
      .catch((error) => {
        console.error('error fetching data:', error);
      });
  }, [setPlatformsName]);

  function HandleSelectPlatformName(name) {
    selectPlatformName(name);
  }

  function handleSetPlatform(currentPlatform) {
    setPlatform(currentPlatform);
  }
  function handleIncreasePage(currentPage) {
    setPage((prevPage) => {
      if (prevPage === currentPage && prevPage < totalPages) {
        return prevPage + 1;
      } else if (prevPage === currentPage && prevPage === totalPages) {
        return 1; // Go back to page one if we are on the last page
      } else {
        return prevPage; // If the current page was not the selected page, do not change the page
      }
    });
  }

  function handleDecreasePage(currentPage) {
    setPage((prevPage) => {
      if (prevPage === 1) {
        return currentPage;
      } else {
        return prevPage - 1;
      }
    });
  }
  useEffect(() => {
    // Fetch the data for the selected platform to calculate the total pages
    fetch(
      `https://api.rawg.io/api/games?platforms=${platform}&key=73601ec88eab474386a6952aa8b34734&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        const totalGames = data.count;
        const pages = Math.ceil(totalGames / 20); // Assuming 20 games per page
        setTotalPages(pages);
        console.log('pages', pages);
      })
      .catch((error) => {
        console.error('error fetching data:', error);
      });
  }, [platform]);

  return (
    <div className="app">
      <Header />
      <FiltersBar
        increasePage={handleIncreasePage}
        decreasePage={handleDecreasePage}
        currentPage={page}
        selectPlatform={handleSetPlatform}
        currentPlatform={platform}
        platformsNames={platformsNames}
        handleOptions={setOptions}
        options={options}
        selectPlatformName={HandleSelectPlatformName}
        name={name}
        setPage={setPage}
      />
      <DisplayItems currentPlatform={platform} currentPage={page} />
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1 className="heading">🕹️React⚛GamesDB🎮</h1>
    </div>
  );
}

function FiltersBar({
  increasePage,
  decreasePage,
  currentPage,
  selectPlatform,
  selectPlatformName,
  currentPlatform,
  platformsNames,
  handleOptions,
  options,
  name,
  setPage,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div>
        <h3 className="bold">{name}</h3>
        <h3>games page {currentPage}</h3>
      </div>
      <div>
        <select
          className="select"
          value={currentPlatform}
          onChange={(e) => {
            selectPlatform(e.target.value);
            selectPlatformName(e.target.options[e.target.selectedIndex].text);
            setPage(1);
          }}
        >
          {options}
        </select>
        <div>
          <p className="bold set-page">Set Page</p>
          <button type="submit" onClick={() => decreasePage(currentPage)}>
            -
          </button>
          <span></span>
          <button type="submit" onClick={() => increasePage(currentPage)}>
            +
          </button>
        </div>
      </div>
    </form>
  );
}

function DisplayItems({ currentPage, currentPlatform }) {
  const [gamesArticles, setGamesArticles] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?platforms=${currentPlatform}&key=73601ec88eab474386a6952aa8b34734&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchedGamesArticles = data.results;
        console.log('fetched data:', fetchedGamesArticles);
        setGamesArticles(fetchedGamesArticles);
      })
      .catch((error) => {
        console.error('error fetching data:', error);
      });
  }, [currentPage, currentPlatform]);

  // Function to handle click on a game card and show the overlay
  const handleGameCardClick = (gameCard) => {
    setSelectedGame(gameCard);
  };

  // Function to close the overlay
  const handleCloseOverlay = () => {
    setSelectedGame(null);
  };

  return (
    <div className="articles-container">
      {gamesArticles.map((gameCard, index) => (
        <article
          key={index}
          className="article"
          onClick={() => handleGameCardClick(gameCard)}
        >
          <img
            className="photo"
            src={gameCard.background_image}
            alt={gameCard.name}
          />
          <div className="item-info">
            <header className="meta">
              <h4 className="title">{gameCard.name}</h4>
            </header>
            <h4 className="price">Released: {gameCard.released}</h4>
            <br></br>
            <div className="bold">Platforms:</div>
            <h6 className="platform">
              {gameCard.platforms.map(
                (platform) => `${platform.platform.name} `
              )}
            </h6>
            <div className="meta">
              <h3 className="metacritic">
                Metacritic:{' '}
                <span className="rating">
                  {gameCard.metacritic !== null ? gameCard.metacritic : 'N/A'}
                </span>
              </h3>
              <div className="underline"></div>
              <div className="genre"></div>

              <div className="bold">Genre</div>
              <h6 className="genre">
                {gameCard.genres.map((genres) => `${genres.name} `)}
              </h6>
            </div>
          </div>
        </article>
      ))}
      {selectedGame && (
        <GameOverlay game={selectedGame} onCloseOverlay={handleCloseOverlay} />
      )}
    </div>
  );
}

// function GameOverlay({ game, onCloseOverlay }) {
//   const [clickedOnce, setClickedOnce] = useState(false);

//   const handleOverlayClick = () => {
//     setClickedOnce(clickedOnce);
//     if (clickedOnce) {
//       setTimeout(() => setClickedOnce(false), 300);
//     } else {
//       onCloseOverlay();
//     }
//   };

//   return (
//     <div
//       className={`overlay ${clickedOnce ? 'clicked-once' : ''}`}
//       onClick={handleOverlayClick}
//     >
//       <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
//         <div className="info">
//           <div>
//             <h2 className="title">{game.name}</h2>
//             <br></br>
//             <h4 className="description">Released: {game.released}</h4>
//             <br></br>
//             <h3 className="bold">Screenshots:</h3>
//             <div>
//               {game.short_screenshots.map((image, id) => (
//                 <img
//                   key={id.id}
//                   className="photo"
//                   src={image.image}
//                   alt={id.id}
//                 />
//               ))}
//             </div>
//             <div className="bold">Platforms:</div>
//             <h6 className="platform">
//               {game.platforms.map((platform) => `${platform.platform.name} `)}
//             </h6>
//             <div className="metacritic bold">Metacritic:</div>
//             <h6 className="overlay-rating">
//               {game.metacritic !== null ? game.metacritic : 'N/A'}
//             </h6>
//             <br></br>
//             <div className="bold">Genre:</div>
//             <br></br>
//             <h6 className="description">
//               {game.genres.map((genres) => `${genres.name} `)}
//             </h6>
//           </div>
//           <div>
//             <h3 className="bold">Description:</h3>
//             <p className="description">
//               {game.description ||
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ipsum ac justo elementum aliquam. Vestibulum ante ipsumprimis in faucibus orci luctus et ultrices posuere cubilia Curae In hac habitasse platea dictumst. Nulla facilisi. Mauris sed purusvitae odio ullamcorper dictum quis quis eros. Duis ac odio velorci finibus rhoncus.'}
//             </p>
//             <h3 className="bold">Game History:</h3>
//             <p className="history">
//               {/* Place your game history placeholder text here */}
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
//               quis ipsum ac justo elementum aliquam. Vestibulum ante ipsum
//               primis in faucibus orci luctus et ultrices posuere cubilia Curae;
//               In hac habitasse platea dictumst. Nulla facilisi. Mauris sed purus
//               vitae odio ullamcorper dictum quis quis eros. Duis ac odio vel
//               orci finibus rhoncus.
//             </p>
//           </div>
//         </div>
//         <button className="close-btn" onClick={onCloseOverlay}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

export default App;
