// App.js

import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  return (
    <div className="app">
      <Header />
      <FiltersBar />
      <DisplayItems />
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

function FiltersBar() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Games to display ?</h3>
      <button type="submit">Show me!</button>
    </form>
  );
}

function DisplayItems() {
  const [gamesArticles, setGamesArticles] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?platforms=166&key=73601ec88eab474386a6952aa8b34734&page=1`
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
  }, []);

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
              <h4>{gameCard.name}</h4>
            </header>
            <h4 className="price">Released {gameCard.released}</h4>
            <h6 className="meta">Platforms</h6>
            <div className="meta">
              <h3>
                Metacritic:{' '}
                <span className="rating">
                  {gameCard.metacritic !== null ? gameCard.metacritic : 'N/A'}
                </span>
              </h3>
              <div className="underline"></div>
              <div className="genre"></div>
              <div className="bold">Genre</div>
              <h5>genre</h5>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default App;
