import {
    METHOD_GET,
    METHOD_POST,
    SERVER_URL,
} from '../constants/api';
import {
    headersReceiveJson,
    headersSendReceiveJson,
} from '../headers';
import { apiHandleResponse } from '../../utils/api';

const getList = (options) => {
    return fetch(`${SERVER_URL}/chat-gpt-ai/messagegpt`, {
        method: METHOD_POST,
        headers: headersSendReceiveJson(),
        body: JSON.stringify(options),
    }).then(apiHandleResponse);
};

const getTitles = () => {
    return fetch(`${SERVER_URL}/chat-gpt-ai/listEssayTitles`, {
        method: METHOD_GET,
        headers: headersReceiveJson()
    }).then(apiHandleResponse);
};

const validateEssay = (options) => {
    return fetch(`${SERVER_URL}/chat-gpt-ai/validateEssay`, {
        method: METHOD_POST,
        headers: headersSendReceiveJson(),
        body: JSON.stringify(options),
    }).then(apiHandleResponse);
};

export {
    getList,
    getTitles,
    validateEssay
};