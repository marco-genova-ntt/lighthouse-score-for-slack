import {formatBaseMessage, formatBaseAttachment} from '../app/index';

test('check default formatBaseMessage usage', () => {
    
    expect(formatBaseMessage(123456).includes('Performance Test - Run 123456 (')).toBeTruthy();
});

test('check default formatBaseAttachment usage', () => {
    let attachment = formatBaseAttachment("Lighthouse Score For Slack",
        "https://www.leroymerlin.it/prodotti/specchi-bagno-CAT35-c",
        "https://www.leroymerlin.it/prodotti/specchi-bagno-CAT35-c",
        "bad perfomances",
        "https://pngimage.net/wp-content/uploads/2018/06/leroy-merlin-png-6.png",
        "42",
        "54",
        "79",
        "100",
        "N/A");
    
    let expectedResult = '[{"fallback":"Perfomance report based on Google LightHouse","author_name":"Lighthouse Score For Slack","title":"https://www.leroymerlin.it/prodotti/specchi-bagno-CAT35-c","text":"bad perfomances","fields":[{"title":"Performance","value":"42","short":true},{"title":"Accessibility","value":"54","short":true},{"title":"Best Practice","value":"79","short":true},{"title":"SEO","value":"100","short":true},{"title":"PWA","value":"N/A","short":true}],"thumb_url":"https://pngimage.net/wp-content/uploads/2018/06/leroy-merlin-png-6.png"}]';

    expect(attachment).toEqual(expectedResult);
});