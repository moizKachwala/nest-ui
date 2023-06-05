import { createSelector } from 'reselect';
import { fromLocalStorage } from '../../utils/storage';

import {
    HEADERS_JSON_SEND,
    HEADERS_JSON_RECEIVE,
    HEADERS_JSON_SEND_RECEIVE,
    HEADERS_OCTET_RECEIVE,
    HEADERS_OCTET_SEND_RECEIVE,
} from '../constants/api';

export const selectAuthHeaders = () => {
    const authToken = fromLocalStorage('authToken', null);
    if (authToken) {
        return { 'Authorization': `Bearer ${authToken}` };
    }
    return { 'Authorization': 'NULL' };
}

const selectAuthHeadersMerge = (baseHeaders) => createSelector(
    selectAuthHeaders,
    (headers) => ({
        ...baseHeaders,
        ...headers,
    })
);

export const selectAuthSendJsonHeaders = selectAuthHeadersMerge(HEADERS_JSON_SEND);
export const selectAuthReceiveJsonHeaders = selectAuthHeadersMerge(HEADERS_JSON_RECEIVE);
export const selectAuthSendReceiveJsonHeaders = selectAuthHeadersMerge(HEADERS_JSON_SEND_RECEIVE);
export const selectAuthReceiveOctetHeaders = selectAuthHeadersMerge(HEADERS_OCTET_RECEIVE);
export const selectAuthSendReceiveOctetHeaders = selectAuthHeadersMerge(HEADERS_OCTET_SEND_RECEIVE);