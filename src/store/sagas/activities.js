import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from '../actions/activities';
import * as API from '../api/activities';
import { sessionErrorHandling } from './session';

function* create(action) {
    try {
        yield put({ type: actions.ACTIVITIES_CREATE_PENDING });
        const {
            activity,
            callback
        } = action.payload;

        const payload = {
            ...activity,
        }
        const newActivity = yield call(API.create, payload);
        yield put({ type: actions.ACTIVITIES_CREATE_FULFILLED, newActivity });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.ACTIVITIES_CREATE_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

export default function*() {
    yield takeEvery(actions.ACTIVITIES_CREATE, create);
}