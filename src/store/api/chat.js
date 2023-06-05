import {
    METHOD_POST,
    SERVER_URL,
} from '../constants/api';
import {
    headersAuthSendReceiveJson,
} from '../headers';
import { apiHandleResponse } from '../../utils/api';

const getList = (options) => {
    return fetch(`${SERVER_URL}/chat-gpt-ai/messagegpt`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(options),
    }).then(apiHandleResponse);
};

export {
    getList
};