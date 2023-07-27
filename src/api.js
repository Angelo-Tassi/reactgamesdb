// Helper function to fetch all games for a specific platform

export async function fetchGamesByPlatform(
  platformId,
  page = 1,
  allGames = []
) {
  const response = await fetch(
    `https://api.rawg.io/api/games?platforms=${platformId}&key=73601ec88eab474386a6952aa8b34734&page=${page}`
  );
  const data = await response.json();
  const fetchedGamesArticles = data.results;

  // Concatenate the new games with the previously fetched games
  const updatedGames = [...allGames, ...fetchedGamesArticles];

  // If there are more pages, recursively fetch the next page
  if (data.next && data.next !== '') {
    return fetchGamesByPlatform(platformId, page + 1, updatedGames);
  } else {
    // If the last page is reached, return all the games for the platform
    return updatedGames;
  }
}
