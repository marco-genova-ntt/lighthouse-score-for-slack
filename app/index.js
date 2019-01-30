import 'babel-polyfill';
import dotenv from 'dotenv';
import path  from  'path';
import process from  'process';
import Emitter  from './emitter';
import * as utility from './utility';

dotenv.config({ path: path.join(process.cwd(), '.env')});

const apiUrl = utility.string("SLACK_BASE_API");
const token = utility.string("SLACK_TOKEN");
const channelRef = utility.string("SLACK_CHANNEL_ID");
let client = new Emitter(apiUrl, token);

let formattedtext = `Performance Test - Run 0000 (${new Date().toISOString()})`;
let formattedAttachments = 
[
    {
        'fallback': 'Required plain-text summary of the attachment',
        "author_name": "Lighthouse Score For Slack",
        "title": "https://www.leroymerlin.it/prodotti/specchi-bagno-CAT35-c",
        "title_link": "https://www.leroymerlin.it/prodotti/specchi-bagno-CAT35-c",
        "text": "example text",
        "fields": [
            {
                "title": "Performance",
                "value": "42",
                "short": true
            },
            {
                "title": "Accessibility",
                "value": "54",
                "short": true
            },
            {
                "title": "Best Practice",
                "value": "79",
                "short": true
            },
            {
                "title": "SEO",
                "value": "100",
                "short": true
            },
            {
                "title": "PWA",
                "value": "0",
                "short": true
            }
        ],
        "thumb_url": "https://pngimage.net/wp-content/uploads/2018/06/leroy-merlin-png-6.png"
    }
];

client.sendMessage(formattedtext, JSON.stringify(formattedAttachments), channelRef);