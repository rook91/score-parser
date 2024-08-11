import { fetchDataWedDriverIO } from './webscrapper/scrapper'
import { predictZpredictionsFromURL } from './webpages/predictZ'

const url = 'https://www.predictz.com/predictions/poland/ekstraklasa/';

async function main() {
  const predictZPage = await fetchDataWedDriverIO(url);
  const predictZScores = predictZpredictionsFromURL(predictZPage);

  predictZScores.forEach((game) => {
    console.log(`${game.home} ${game.score} ${game.away}`);
  });
  
}

main();
