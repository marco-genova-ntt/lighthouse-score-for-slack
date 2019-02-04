import {formatBaseMessage, formatBaseAttachment, extractPerformanceValues, extractValue} from '../app/index';

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

    expect(attachment).toEqual(JSON.parse(expectedResult));
});

test ('test perfomance estraction', () => {
    let results = {
        categories : {
            performance: {
                score: 0.1
            },
            accessibility: {
                score: 0.2
            },
            "best-practices": {
                score: 0.3
            },
            pwa: {
                score: 0.4
            },
            seo: {
                score: 0.5
            }
        },
        finalUrl: 'http://example.com/test?due'
    };
    let response = extractPerformanceValues(results);

    expect(response.performance).toBe(10);
    expect(response.accessibility).toBe(20);
    expect(response.bestpractices).toBe(30);
    expect(response.pwa).toBe(40);
    expect(response.seo).toBe(50);
    expect(response.url).toBe('http://example.com/test?due');

});

test ('test extract Value NA', () => {
    let results = {
        categories : {
            performance: {
                score: 0.1
            },
            accessibility: {
                score: 0.2
            },
            "best-practices": {
                score: 0.3
            },
            pwa: {
                score: 0.4
            },
            seo: {
                score: 0.5
            }
        },
        finalUrl: 'http://example.com/test?due'
    };

    expect(extractValue(results.categories, 'not-exist')).toBe('NA');
});