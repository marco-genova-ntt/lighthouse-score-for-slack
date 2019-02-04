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
    client.sendMessage(message, JSON.stringify(attachments), channelRef);
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

/**
 * JSON contians 'score' property
 */
export const hasScore = R.has('score');

/**
 * Dispatchs the request of slack message creation
 * 
 * @param {*} idRunner identifier of the run of analysis
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
export function dispatchMessage(idRunner, author, title, titleLink, internalText = '', thumbUrl = '', performance= 'NA', accessibility= 'NA', bestPractice= 'NA', seo= 'NA', pwa= 'NA') {
    const message = formatBaseMessage(idRunner);
    const attachments = formatBaseAttachment(author, title, titleLink, internalText, thumbUrl, performance, accessibility, bestPractice, seo, pwa);
    writeOnChat(message, attachments);
}

/**
 * Extract from results object the base information for slack message
 * 
 * <ol>
 *  <li>performance score</li>
 *  <li>accessibility score</li>
 *  <li>best practice score</li>
 *  <li>seo score</li>
 *  <li>pwa score</li>
 *  <li>final url examined</li>
 * </ol>
 * 
 * @param {*} results lighthouse results
 */
export function extractPerformanceValues (results) {
    return {
        performance: extractValue(results.categories, 'performance'),
        accessibility: extractValue(results.categories, 'accessibility'),
        bestpractices: extractValue(results.categories, 'best-practices'),
        seo: extractValue(results.categories, 'seo'),
        pwa: extractValue(results.categories, 'pwa'),
        url: results.finalUrl
    };
}

/**
 * Gets score value of a category.
 * 
 * For the model of json object @see https://github.com/GoogleChrome/lighthouse/blob/master/docs/understanding-results.md
 * 
 * @param {*} categories all categories
 * @param {*} idCategory reference to category
 */
export function extractValue (categories, idCategory) {
    const hasCategory = R.has(idCategory);
    
    if (categories && hasCategory(categories)) {
        const category = categories[idCategory];
        if (hasScore(category)) {
            return category.score * 100;
        }
    }

    return 'NA';
}