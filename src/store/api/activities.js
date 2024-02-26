import {
    METHOD_POST,    
    SERVER_URL,
} from '../constants/api';
import {
    headersAuthSendReceiveJson,
} from '../headers';
import { apiHandleResponse } from '../../utils/api';

const create = (activity) => {
    return fetch(`${SERVER_URL}/activities`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(activity)
    }).then(apiHandleResponse);
};

export {
    create,
};