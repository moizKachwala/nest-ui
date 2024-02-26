import { takeEvery, put, call } from 'redux-saga/effects';

import * as actions from '../actions/activityTypes';
import * as API from '../api/activityTypes';
import { sessionErrorHandling } from './session';

function* getList(action) {
    try {
        yield put({ type: actions.ACTIVITY_TYPES_LIST_PENDING });
        const payload = yield call(API.list);
        yield put({ type: actions.ACTIVITY_TYPES_LIST_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.ACTIVITY_TYPES_LIST_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

export default function*() {
    yield takeEvery(actions.ACTIVITY_TYPES_LIST, getList);
}