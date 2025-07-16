import cheerio from 'cheerio';

export function extractImageUrls(content: string): string[] {
    const $ = cheerio.load(content);
    const urls: string[] = [];
    $('img').each((_: number, el: cheerio.Element) => {
        const src = $(el).attr('src');
        if (src) urls.push(src);
    });
    return urls;
} 