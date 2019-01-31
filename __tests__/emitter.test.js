import Emitter from '../app/emitter';

test('check default constructor', () => {
    let apiUrl = "https://example.com/path?token={token}&pretty=2";
    let token = "1234567890";
    let client = new Emitter(apiUrl, token);
    
    expect(client.url).toBe("https://example.com/path?token=1234567890&pretty=2");
});

test('check add message info without attachments', () => {
    let apiUrl = "https://example.com/path?token={token}&pretty=2";
    let token = "1234567890"
    let client = new Emitter(apiUrl, token);
    
    let conf = {
        method: 'POST',
        url: client.url
    };

    let formattedMessage = "message for test";
    let channel = "channel base";

    let newConf = Emitter.addMessageInfoTo(conf, formattedMessage, undefined, channel);
    expect(newConf).not.toEqual(conf);
    
    expect(newConf.text).toBe(formattedMessage);
    expect(newConf.channelId).toBe(channel);
});

test('check add message info with all elements', () => {
    let apiUrl = "https://example.com/path?token={token}&pretty=2";
    let token = "1234567890";
    let client = new Emitter(apiUrl, token);
    
    let conf = {
        method: 'POST',
        url: client.url
    };

    let formattedMessage = "message for test";
    let channel = "channel base";
    let formattedAttachments = "{[attachments: 'minivalues']}";

    let newConf = Emitter.addMessageInfoTo(conf, formattedMessage, formattedAttachments, channel);
    expect(newConf).not.toEqual(conf);
    
    expect(newConf.text).toBe(formattedMessage);
    expect(newConf.channelId).toBe(channel);
    expect(newConf.attachments).toBe(formattedAttachments);
});

test('check xreate real api to call', () => {
    let apiUrl = "https://example.com/{method}?token={token}&pretty=2";
    let token = "1234567890";
    let client = new Emitter(apiUrl, token);
    
    let conf = {
        method: 'POST',
        url: client.url
    };

    let formattedMessage = "message for test";
    let channel = "channel base";
    let formattedAttachments = "{[attachments: 'minivalues']}";

    let newConf = Emitter.addMessageInfoTo(conf, formattedMessage, formattedAttachments, channel);
    let lastConf = Emitter.createAPIUrlFromConf(newConf, "test.test");
    expect(lastConf).not.toEqual(newConf);
    expect(lastConf.url).toBe("https://example.com/test.test?token=1234567890&pretty=2&channel=channel base&text=message for test&attachments={[attachments: 'minivalues']}");
});


test('check preparing message', () => {
    let apiUrl = "https://example.com/{method}?token={token}&pretty=2";
    let token = "1234567890";
    let client = new Emitter(apiUrl, token);
    
    let conf = {
        method: 'POST',
        url: client.url
    };

    let formattedMessage = "message for test";
    let channel = "channel base";
    let formattedAttachments = "{[attachments: 'minivalues']}";
    let newConf = client.prepareMessage(formattedMessage,formattedAttachments, channel);
    
    expect(newConf.text).toBe(formattedMessage);
    expect(newConf.channelId).toBe(channel);
    expect(newConf.attachments).toBe(formattedAttachments);
    expect(newConf.url).toBe("https://example.com/chat.postMessage?token=1234567890&pretty=2&channel=channel base&text=message for test&attachments={[attachments: 'minivalues']}");
});