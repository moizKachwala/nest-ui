import { takeEvery, put, call } from 'redux-saga/effects';

import * as actions from '../actions/chat';
import * as API from '../api/chat';
// import { sessionErrorHandling } from './session';

function* getList(action) {
    try {
        yield put({ type: actions.CHAT_GET_RESPONSE_PENDING });
        const payload = yield call(API.getList);
        yield put({ type: actions.CHAT_GET_RESPONSE_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.CHAT_GET_RESPONSE_REJECTED, payload: errorMessage });
        // yield call(sessionErrorHandling, error);
    }
}

// export function* reset() {
//     yield put({ type: actions.CHAT_GET_RESPONSE_RESET });
// }

export default function*() {
    yield takeEvery(actions.CHAT_GET_RESPONSE, getList);
}