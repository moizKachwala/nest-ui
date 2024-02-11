import {
    METHOD_POST, METHOD_GET, SERVER_URL
} from '../constants/api';
import { headersSendReceiveJson, headersAuthReceiveJson } from '../../store/headers';

import { apiHandleResponse } from '../../utils/api';

const login = (username = '', password = '') => {
    return fetch(`${SERVER_URL}/auth/login`, {
        method: METHOD_POST,
        headers: headersSendReceiveJson(),
        body: JSON.stringify({ username, password }),
    }).then(apiHandleResponse);
};

const getCurrentUser = () => {
    return fetch(`${SERVER_URL}/users/me`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
}

export {
    login,
    getCurrentUser,
};