import {
    METHOD_GET,    
    SERVER_URL,
} from '../constants/api';
import {
    headersAuthReceiveJson,
} from '../headers';
import { apiHandleResponse } from '../../utils/api';

const list = () => {
    return fetch(`${SERVER_URL}/activity-types`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson()
    }).then(apiHandleResponse);
};

export {
    list,
};