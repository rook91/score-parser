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
exports.fetchDataWedDriverIO = fetchDataWedDriverIO;
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome = __importStar(require("selenium-webdriver/chrome"));
const driver = new selenium_webdriver_1.Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();
async function fetchDataWedDriverIO(url) {
    let pageHtml;
    try {
        await driver.get(url);
        await driver.wait(selenium_webdriver_1.until.titleIs('Poland Ekstraklasa Predictions and Tips - predictZ.com'), 20000);
        pageHtml = await driver.getPageSource();
    }
    finally {
        await driver.quit();
    }
    return pageHtml;
}
//# sourceMappingURL=scrapper.js.map