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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome = __importStar(require("selenium-webdriver/chrome"));
// import * as path from 'path';
// Specify the path to the ChromeDriver if it's not in your PATH
// const chromeDriverPath = path.resolve('\chromedriver\chromedriver-127.0.6533.99.exe');
const driver = new selenium_webdriver_1.Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();
function fetchDataWedDriverIO(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield driver.get(url);
            yield driver.wait(selenium_webdriver_1.until.titleIs('Poland Ekstraklasa Predictions and Tips - predictZ.com'), 20000);
            const pageHtml = yield driver.getPageSource();
            getPredictionsFromPage(pageHtml);
        }
        finally {
            yield driver.quit();
        }
    });
}
function getPredictionsFromPage(html) {
    const $ = cheerio.load(html);
    const predictTable = $('tbody');
    const predictRows = [];
    predictTable.each((index, element) => {
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
                const teams = $(row).find('td.fixt').text().split('v');
                data.home = teams[0].trim();
                data.away = teams[1].trim();
                predictionRows.push(data);
            }
        }
    });
    predictionRows.forEach((data) => {
        console.log(`${data.home} ${data.score} ${data.away}`);
    });
    return predictionRows;
}
const url = 'https://www.predictz.com/predictions/poland/ekstraklasa/';
const predictZ = fetchDataWedDriverIO(url);
//# sourceMappingURL=index.js.map