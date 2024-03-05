import {
    METHOD_POST,    
    SERVER_URL,
    METHOD_GET,
} from '../constants/api';
import {
    headersAuthSendReceiveJson,
    headersAuthReceiveJson,
} from '../headers';
import { apiHandleResponse } from '../../utils/api';

const getActivitiesByStudent = (studentId) => {
    return fetch(`${SERVER_URL}/activity-assignment/student/${studentId}`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

const submitAssignment = (assignmentId, response) => {
    return fetch(`${SERVER_URL}/activity-assignment/${assignmentId}/submit`, {
        method: METHOD_POST,
        headers: headersAuthSendReceiveJson(),
        body: JSON.stringify(response),
    }).then(apiHandleResponse);
};

const get = (activityAssignmentId) => {
    return fetch(`${SERVER_URL}/activity-assignment/${activityAssignmentId}`, {
        method: METHOD_GET,
        headers: headersAuthReceiveJson(),
    }).then(apiHandleResponse);
};

export {
    getActivitiesByStudent,
    submitAssignment,
    get,
};