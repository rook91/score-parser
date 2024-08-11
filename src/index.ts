import * as cheerio from 'cheerio';
import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
// import * as path from 'path';

// Specify the path to the ChromeDriver if it's not in your PATH
// const chromeDriverPath = path.resolve('\chromedriver\chromedriver-127.0.6533.99.exe');

const driver: WebDriver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

async function fetchDataWedDriverIO(url: string){
    try {
        await driver.get(url);
        await driver.wait(until.titleIs('Poland Ekstraklasa Predictions and Tips - predictZ.com'), 20000);
        const pageHtml = await driver.getPageSource();
        getPredictionsFromPage(pageHtml);
    } finally {
        await driver.quit();
    }
}

function getPredictionsFromPage(html: string): { score: string, home: string, away:string }[] {       
    const $ = cheerio.load(html);
    const predictTable = $('tbody');

    const predictRows:any[] = [];
    predictTable.each((index, element) => {
        const predictTable = $('tbody');
        const rows = $(element).find('tr');
        rows.each((i, row) => {
            predictRows.push(row);
        });
    });

    const predictionRows:any[] = [];
    predictRows.forEach((row) => {
        const keyWords = ['Away', 'Home', 'Draw'];
        const htmlRow = $(row).html() || '';
        for(let word of keyWords) {
            const index = htmlRow.indexOf(word);
            if(index !== -1){
                const data = {
                    score: '',
                    away: '',
                    home: '',
                };
                data.score = htmlRow.substring(index+5, index+8);
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
