import {
    METHOD_POST, METHOD_GET, SERVER_URL
} from '../constants/api';
import { headersSendReceiveJson, headersAuthReceiveJson } from '../../store/headers';

import { apiHandleResponse } from '../../utils/api';

const getStudentsByParent = (parentId) => {
    return fetch(`${SERVER_URL}/students/parent/${parentId}`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

export {
    getStudentsByParent,
};