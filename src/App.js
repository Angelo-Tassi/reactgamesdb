// App.js

import React, { useState, useEffect } from "react";
import GameOverlay from "./gameoverlay";

import "./index.css";

function App() {
  const [platform, setPlatform] = useState(166);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [platformsNames, setPlatformsName] = useState([]);
  const [options, setOptions] = useState([]);
  const [name, selectPlatformName] = useState(["Commodore/Amiga"]);
  const [totalGames, setTotalGames] = useState(0);
  const [gamesArticles, setGamesArticles] = useState([]);
  const [userSearch, setUserSearch] = useState("");

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/platforms?key=08be821e6a4c474dad80c5fb540779c7`
    )
      .then((response) => response.json())
      .then((data) => {
        const platformsNames = data.results;
        console.log("fetched platforms:", platformsNames);
        setPlatformsName(platformsNames);
        const dropDownOptions = platformsNames.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ));
        console.log("options", dropDownOptions);
        setOptions(dropDownOptions);
      })
      .catch((error) => {
        console.error("error fetching data:", error);
      });
  }, [setPlatformsName]);

  function HandleSelectPlatformName(name) {
    selectPlatformName(name);
  }

  function handleSetPlatform(currentPlatform) {
    setPlatform(currentPlatform);
    setUserSearch("");
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
    fetch(
      `https://api.rawg.io/api/games?platforms=${platform}&key=08be821e6a4c474dad80c5fb540779c7&page=${page}&search=${userSearch}`
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchedGamesArticles = data.results;
        console.log("fetched data:", fetchedGamesArticles);
        setGamesArticles(fetchedGamesArticles);
        const totalGames = data.count;
        console.log("totalgames:", totalGames);

        const pages = Math.ceil(totalGames / 20); // Assuming 20 games per page
        setTotalPages(pages);
        console.log("pages", pages);
        setTotalGames(totalGames);
      })
      .catch((error) => {
        console.error("error fetching data:", error);
      });
  }, [page, platform, userSearch]);

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
        gamesArticles={gamesArticles}
        userSearch={userSearch}
        setUserSearch={setUserSearch}
        setGamesArticles={setGamesArticles}
      />
      <Stats
        currentPage={page}
        name={name}
        totalGames={totalGames}
        totalPages={totalPages}
        userSearch={userSearch}
        gamesArticles={gamesArticles}
        setUserSearch={setUserSearch}
      />
      <DisplayItems
        gamesArticles={gamesArticles}
        currentPlatform={platform}
        currentPage={page}
        userSearch={userSearch}
        totalGames={totalGames}
        totalPages={totalPages}
        setGamesArticles={setGamesArticles}
      />
      <Stats
        currentPage={page}
        name={name}
        totalGames={totalGames}
        totalPages={totalPages}
        userSearch={userSearch}
        gamesArticles={gamesArticles}
        setUserSearch={setUserSearch}
      />
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
  gamesArticles,
  userSearch,
  setUserSearch,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleUserSearch = (e) => setUserSearch(e.target.value);

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="padding">
        <input
          type="text"
          placeholder="..Search Game"
          value={userSearch}
          onChange={handleUserSearch}
        />
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
          <button type="submit" onClick={() => increasePage(currentPage)}>
            +
          </button>
        </div>
      </div>
    </form>
  );
}

function DisplayItems({
  userSearch,
  gamesArticles,
  currentPage,
  currentPlatform,
  totalPages,
  setGamesArticles,
}) {
  const filteredGames = gamesArticles
    ? gamesArticles.filter((game) =>
        game.name.toLowerCase().includes(userSearch.toLowerCase())
      )
    : [];
  const [selectedGame, setSelectedGame] = useState(null);
  // const fiteredGamesArticles = gamesArticles.filter((game) =>
  //   game.name.toLowerCase().includes(userSearch.toLowerCase())
  // );

  const handleGameCardClick = (gameCard) => {
    setSelectedGame(gameCard);
  };

  // Function to close the overlay
  const handleCloseOverlay = () => {
    setSelectedGame(null);
  };

  return (
    <>
      <div className="articles-container">
        {filteredGames.map((gameCard, index) => (
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
                  Metacritic:{" "}
                  <span className="rating">
                    {gameCard.metacritic !== null ? gameCard.metacritic : "N/A"}
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
          <GameOverlay
            game={selectedGame}
            onCloseOverlay={handleCloseOverlay}
          />
        )}
      </div>
      <div className="footerLine"></div>
    </>
  );
}

function Stats({
  totalGames,
  name,
  totalPages,
  currentPage,
  userSearch,
  gamesArticles,
  setUserSearch,
}) {
  console.log("usersearch", userSearch);

  const totalItems = totalGames;

  const percentage = Math.round((currentPage / totalPages) * 100);
  return (
    <>
      <footer className="stats">
        {userSearch === "" ? (
          <em>
            {`There are ${totalGames} ${
              totalItems === 1 ? "game" : "games"
            } on the ${name} platform, you are browsing page ${currentPage} of the ${totalPages} pages available for the platform. You browsed ${percentage} % of the ${name} platform content..◻️`}
          </em>
        ) : (
          <div>
            {`Searching..◻️`}
            <div className="padding2">
              <button type="submit" onClick={() => setUserSearch("")}>
                Reset
              </button>
            </div>
          </div>
        )}
      </footer>
    </>
  );
}

export default App;
