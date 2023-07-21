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
      <h1>🕹️React GamesDB🕹️</h1>
    </div>
  );
}

function FiltersBar() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What games do you want to display ?</h3>
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
          <img src={gameCard.background_image} alt={gameCard.name} />
          <div>
            <header>
              <h4>{gameCard.name}</h4>
            </header>
            <h4>Released {gameCard.released}</h4>
            <h6>Platforms</h6>
            <div>
              <h3>
                Metacritic:{' '}
                <span>
                  {gameCard.metacritic !== null ? gameCard.metacritic : 'N/A'}
                </span>
              </h3>
              {/* Add other content here */}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default App;
