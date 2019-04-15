import {doIt} from './caller';

/**
 * Emitter slack request. Based on http call.
 */
class EmitterWH {

    /**
     * Default constructor
     * 
     * @param {*} apiUrl base api url contains token placeholder
     */
    constructor (apiUrl) {
        if(!apiUrl) {
            throw new Error('Not configured url');
        }

        this._url = apiUrl;
    }

    /**
     * Sends a message to slack channel
     * see documentation for details: @see https://api.slack.com/methods/chat.postMessage
     * 
     * @param {*} formattedMessage Message to send
     * @param {*} formattedAttachments Attachments to send
     */
    sendMessage (formattedMessage, formattedAttachments) {
        
        let callConf = {
            method: 'POST',
            url: this._url,
            data: {
                'text' : formattedMessage,
                'attachments': JSON.parse(formattedAttachments)
            }
        };

        doIt(callConf);
    }

    /**
     * gets the template url used for the API call 
     */
    get url() {
        return this._url;
    }

}

export default EmitterWH;