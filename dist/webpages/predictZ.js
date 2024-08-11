"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictZpredictionsFromURL = predictZpredictionsFromURL;
const cheerio = __importStar(require("cheerio"));
function predictZpredictionsFromURL(html) {
    const $ = cheerio.load(html);
    const predictTable = $('tbody');
    const predictRows = [];
    predictTable.each((i, element) => {
        const predictTable = $('tbody');
        const rows = $(element).find('tr');
        rows.each((i, row) => {
            predictRows.push(row);
        });
    });
    const predictionRows = [];
    predictRows.forEach((row) => {
        const keyWords = ['Away', 'Home', 'Draw'];
        const htmlRow = $(row).html() || '';
        for (let word of keyWords) {
            const index = htmlRow.indexOf(word);
            if (index !== -1) {
                const data = {
                    score: '',
                    away: '',
                    home: '',
                };
                data.score = htmlRow.substring(index + 5, index + 8);
                const teams = $(row).find('td.fixt').text().split(' v');
                data.home = teams[0].trim();
                data.away = teams[1].trim();
                predictionRows.push(data);
            }
        }
    });
    return predictionRows;
}
//# sourceMappingURL=predictZ.js.map