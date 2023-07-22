// App.js

import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [platform, setPlatform] = useState(166);
  const [page, setPage] = useState(1);
  function handleSetPlatform(currentPlatform) {
    setPlatform(currentPlatform);
  }
  function handleIncreasePage(currentPage) {
    setPage(currentPage >= 1 ? currentPage + 1 : currentPage);
  }
  function handleDecreasePage(currentPage) {
    setPage(currentPage >= 2 ? currentPage - 1 : currentPage);
  }
  return (
    <div className="app">
      <Header />
      <FiltersBar
        increasePage={handleIncreasePage}
        decreasePage={handleDecreasePage}
        currentPage={page}
        selectPlatform={handleSetPlatform}
        currentPlatform={platform}
      />
      <DisplayItems currentPlatform={platform} currentPage={page} />
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1>🕹️React⚛GamesDB🎮</h1>
    </div>
  );
}

function FiltersBar({
  increasePage,
  decreasePage,
  currentPage,
  selectPlatform,
  currentPlatform,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>
        {currentPlatform} games page {currentPage}
      </h3>
      <button
        className="buttonWidht"
        type="submit"
        onClick={() => decreasePage(currentPage)}
      >
        Previous Page
      </button>
      <button
        className="buttonWidht"
        type="submit"
        onClick={() => increasePage(currentPage)}
      >
        Next Page
      </button>
      <select value={currentPlatform} onChange={selectPlatform}>
        <option value={currentPlatform}>{currentPlatform}</option>
      </select>
    </form>
  );
}

function DisplayItems({ currentPage, currentPlatform }) {
  const [gamesArticles, setGamesArticles] = useState([]);

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

  return (
    <div className="articles-container">
      {gamesArticles.map((gameCard, index) => (
        <article key={index} className="article">
          <img
            className="photo"
            src={gameCard.background_image}
            alt={gameCard.name}
          />
          <div className="item-info">
            <header className="meta">
              <h4 className="title">{gameCard.name}</h4>
            </header>
            <h4 className="price">Released {gameCard.released}</h4>
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
    </div>
  );
}

export default App;