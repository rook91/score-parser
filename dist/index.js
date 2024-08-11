"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scrapper_1 = require("./webscrapper/scrapper");
const predictZ_1 = require("./webpages/predictZ");
const url = 'https://www.predictz.com/predictions/poland/ekstraklasa/';
async function main() {
    const predictZPage = await (0, scrapper_1.fetchDataWedDriverIO)(url);
    const predictZScores = (0, predictZ_1.predictZpredictionsFromURL)(predictZPage);
    predictZScores.forEach((game) => {
        console.log(`${game.home} ${game.score} ${game.away}`);
    });
}
main();
//# sourceMappingURL=index.js.map