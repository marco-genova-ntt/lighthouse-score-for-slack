import EmitterWH from '../app/emitterWH';

test('check default constructor', () => {
    let apiUrl = "https://example.com/path?token={token}&pretty=2";
    let client = new EmitterWH(apiUrl);
    
    expect(client.url).toBe("https://example.com/path?token={token}&pretty=2");
});