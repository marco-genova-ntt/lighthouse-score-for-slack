import axios from 'axios';

/**
 * Utility to manage the HTTP call to Slack.
 * The utility is based on axios.
 * 
 * @param {*} callConf 
 * @param {*} successCallback 
 * @param {*} errCallBack 
 */
export function doIt( callConf, successCallback, errCallBack) {
    const success = successCallback? successCallback:standardManageSucRespose;
    const error = errCallBack? errCallBack:standardManageErrRespose;

    switch(callConf.method) { 
        case 'GET': { 
           axios.get(callConf.url).then(success).catch(error); 
           break; 
        } 
        case 'POST': { 
           if (callConf.data) {
                axios.post(callConf.url, callConf.data).then(success).catch(error);
           } else {
                axios.post(callConf.url).then(success).catch(error);
           }
           
           break; 
        } 
        default: { 
           console.error("http method not valid: %s", callConf.method);
           break; 
        } 
    }
} 

/**
 * Default success response manager. Only logging.
 * 
 * @param {*} resp http response object
 */
function standardManageSucRespose (resp) {   
    console.log(resp.data);
}

/**
 * Default error response manager. Only logging.
 * 
 * @param {*} err error object
 */
function standardManageErrRespose (err) {
    console.error(" problem on call: %s", err.message);
}