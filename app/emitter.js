import {doIt} from './caller';
import * as utility from './utility';
import * as R from 'ramda';

/**
 * Emitter slack request. Based on http call.
 */
class Emitter {

    /**
     * Default constructor
     * 
     * @param {*} apiUrl base api url contains token placeholder
     * @param {*} token token to substitute
     */
    constructor (apiUrl, token) {
        if(!token) {
            throw new Error('Not configured token');
        }

        this._url = utility.replace(apiUrl, 'token', token);
    }
    
    /**
     * Sends a message to slack channel
     * see documentation for details: @see https://api.slack.com/methods/chat.postMessage
     * 
     * @param {*} formattedMessage Message to send
     * @param {*} formattedAttachments Attachments to send
     * @param {*} channelRef channel identifer, not name
     */
    sendMessage (formattedMessage, formattedAttachments, channelRef) {
        if(R.isEmpty(formattedMessage)) {
            throw new Error('Empty message');
        }

        let callConf = {
            method: 'POST',
            url: this._url
        };

        callConf = Emitter.addMessageInfoTo(callConf, formattedMessage, formattedAttachments, channelRef);
        callConf = Emitter.createAPIUrlFromConf(callConf, 'chat.postMessage');
        doIt(callConf);
    }

    /**
     * Checks authentication status.
     * see documentation for details: @see https://api.slack.com/methods/check.auth
     * 
     * XXX It will be implmented in next release
     */
    checkAuth() {
        //XXX Not Implemented
    }

    /**
     * Get List of all channels.
     * see documentation for details: @see https://api.slack.com/methods/conversations.list
     * 
     * XXX It will be implmented in next release
     */
    getAllChannels() {
        //XXX Not Implemented
    }

    /**
     * gets the template url used for the API call 
     */
    get url() {
        return this._url;
    }

    //static functions

    /**
     * Creates new configuration for caller. Adds:<br>
     * <ul>
     *  <li>text</li>
     *  <li>attachments</li>
     *  <li>channel</li>
     * </ul>
     * 
     * @param {*} conf configuration for caller
     * @param {*} formattedMessage formatted message to send
     * @param {*} formattedAttachments formatted attachments 
     * @param {*} channelRef channel reference
     */
    static addMessageInfoTo(conf, formattedMessage, formattedAttachments, channelRef) {
        let newConf = R.clone(conf);
        newConf.text=formattedMessage;
        newConf.channelId=channelRef;

        if (formattedAttachments && !R.isEmpty(formattedAttachments)) {
            newConf.attachments=formattedAttachments;
        }

        return newConf;
    }

    /**
     * Creates the URL to execute the method on slack. 
     * Creates new configuration for caller with correct values. 
     *  
     * @param {*} callConf caller configuraiton
     * @param {*} methodName slack methods name to invoke
     */
    static createAPIUrlFromConf(callConf, methodName) {
        let newConf = R.clone(callConf);
        let populatedUrl = newConf.url;

        if (callConf.hasOwnProperty('channelId')) {
            populatedUrl = utility.concatAll(populatedUrl, '&channel=', callConf.channelId);
        }

        if (callConf.hasOwnProperty('text')) {
            populatedUrl = utility.concatAll(populatedUrl, '&text=', callConf.text);
        }
        
        if (callConf.hasOwnProperty('attachments')) {
            populatedUrl = utility.concatAll(populatedUrl, '&attachments=', callConf.attachments);
        }

        newConf.url = utility.replace(populatedUrl, 'method', methodName);

        return newConf;
    }
}

export default Emitter;