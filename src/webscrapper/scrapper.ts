import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

const driver: WebDriver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

export async function fetchDataWedDriverIO(url: string): Promise<string>{
    let pageHtml;
    try {
        await driver.get(url);
        await driver.wait(until.titleIs('Poland Ekstraklasa Predictions and Tips - predictZ.com'), 20000);
        pageHtml = await driver.getPageSource();
    } finally {
        await driver.quit();
    }
    return pageHtml;
}