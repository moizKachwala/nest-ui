import {
    METHOD_POST,    
    SERVER_URL,
    METHOD_GET,
} from '../constants/api';
import {
    headersAuthSendReceiveJson,
    headersAuthReceiveJson,
    headersAuthSendReceiveTextHtml,
} from '../headers';
import { apiHandleResponse } from '../../utils/api';

const create = (activity) => {
    return fetch(`${SERVER_URL}/activities`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(activity)
    }).then(apiHandleResponse);
};

const get = (activityId) => {
    return fetch(`${SERVER_URL}/activities/${activityId}`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};


export {
    create,
    get,
};