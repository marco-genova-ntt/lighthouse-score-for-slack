import dotenv from 'dotenv';
import path  from  'path';
import process from  'process';
import Emitter  from './emitter';
import * as utility from './utility';
import * as R from 'ramda';

/**
 * Writes on slack chat
 * 
 * @param {*} message message 
 * @param {*} attachments attachments, potentially a list.
 */
export function writeOnChat(message, attachments) {
    dotenv.config({ path: path.join(process.cwd(), '.env')});
    const apiUrl = utility.string("SLACK_BASE_API");
    const token = utility.string("SLACK_TOKEN");
    const channelRef = utility.string("SLACK_CHANNEL_ID");
    let client = new Emitter(apiUrl, token);
    client.sendMessage(formattedtext, JSON.stringify(formattedAttachments), channelRef);
}

/**
 * Generates a base message ready to be senti via API see writeOnChat
 * 
 * @param {*} idRunner id of the runner, if it is undefined this value is generated
 */
export function formatBaseMessage(idRunner) {
    let identifier = idRunner || R.isEmpty(idRunner) ? 
        idRunner:
        utility.randomInt(1000000,9999999);

    let internalDate=new Date().toISOString();
    let formattedtext = `Performance Test - Run ${identifier} (${internalDate})`;

    return formattedtext;
}

/**
 * Create an attachment structere ready to be sent via API see writeOnChat
 * 
 * @param {*} author author of post
 * @param {*} title title of attachment
 * @param {*} titleLink link of attachment
 * @param {*} internalText test in attachment card
 * @param {*} thumbUrl url of the image
 * @param {*} performance perfomance value in field
 * @param {*} accessibility assibility value in field
 * @param {*} bestPractice best practice value in field
 * @param {*} seo seo value in field
 * @param {*} pwa pwa value in field
 */
export function formatBaseAttachment(author, title, titleLink, internalText, thumbUrl, performance, accessibility, bestPractice, seo, pwa) {
    let attachments = [{
        fallback: 'Perfomance report based on Google LightHouse',
        author_name: author,
        title: title,
        title: titleLink,
        text: internalText,
        fields: [
            {
                title: "Performance",
                value: performance,
                short: true
            },
            {
                title: "Accessibility",
                value: accessibility,
                short: true
            },
            {
                title: "Best Practice",
                value: bestPractice,
                short: true
            },
            {
                title: "SEO",
                value: seo,
                short: true
            },
            {
                title: "PWA",
                value: pwa,
                short: true
            }
        ],
        thumb_url : thumbUrl
    }];

    return JSON.stringify(attachments);
}