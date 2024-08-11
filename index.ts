import axios from 'axios';
import * as cheerio from 'cheerio';

// Define the type for the function that will fetch the data
async function getTextFromAnimatorDiv(url: string): Promise<string | null> {
    try {
        // Fetch the HTML content from the URL
        const { data } = await axios.get(url);

        // Load the HTML content into Cheerio
        const $ = cheerio.load(data);

        // Find the div with class "animator" and get its text content
        const text = $('div.animator').text().trim();

        // Return the text if found, otherwise return null
        return text || null;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return null;
    }
}

// Example usage
const url = 'https://abc.com';
getTextFromAnimatorDiv(url).then((text) => {
    if (text) {
        console.log(`Text from "animator" div: ${text}`);
    } else {
        console.log('No text found in "animator" div.');
    }
});
