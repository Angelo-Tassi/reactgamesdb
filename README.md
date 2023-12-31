# React Games Database App

live on : https://reactgamesdb.netlify.app

<img src='./Screenshot.png'></img>

This is a simple web application built with React that allows users to browse and search for games from the RAWG Video Games Database API. Users can filter games based on platforms and browse pages.

## Features

- Browse games by platform
- Search games by platform
- Pagination to navigate through game pages
- Footer and Header bars displaying stats regarding the available content
- Click on a game card to view more details and screenshots of the game in an overlay
- Responsive design for mobile and desktop screens

## Missing

- Game descriptions and history, still not available in the API: looking into GPT API to have them dynamically generated.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the project dependencies.
4. Run `npm start` to start the development server.
5. Open your web browser and go to `http://localhost:3000` to view the app.

## Dependencies

- React
- React Router DOM
- Node.js (for development)

## API

This app uses the RAWG Video Games Database API to fetch and display game data. You can find more information about the API [here](https://rawg.io/apidocs).

## Credits

- App design and development by Angelo Tassi
- Game data provided by the [RAWG Video Games Database API](https://rawg.io/apidocs)

## License

This project is licensed under the [MIT License](LICENSE).
