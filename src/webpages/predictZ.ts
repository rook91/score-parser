import * as cheerio from 'cheerio';

export function predictZpredictionsFromURL(html: string): { score: string, home: string, away:string }[] {       
    const $ = cheerio.load(html);
    const predictTable = $('tbody');

    const predictRows:any[] = [];
    predictTable.each((i, element) => {
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
                const teams = $(row).find('td.fixt').text().split(' v');
                data.home = teams[0].trim();
                data.away = teams[1].trim();
                predictionRows.push(data);
            }
        }
    });

    return predictionRows;
}

