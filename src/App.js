import './index.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Filters />
      <DisplayItems />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1>RGamesDB</h1>
    </div>
  );
}
function Filters() {
  return (
    <form className="add-form">
      <h3>What games do you want to display ?</h3>

      <button type="submit">Show me !</button>
    </form>
  );
}
function DisplayItems() {
  const request = fetch(
    `https://api.rawg.io/api/games?platforms=166&key=73601ec88eab474386a6952aa8b34734&page=1`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const gameArticles = data.results;
      console.log(gameArticles);

      return (
        <div className="list">
          <h3>What games do you want to display ?</h3>
        </div>
      );
    });
}

function Footer() {
  return (
    <div className="stats">
      <p>React Games db</p>
    </div>
  );
}

export default App;
