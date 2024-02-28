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

function* getByStudent(action) {
    try {
        yield put({ type: actions.ACTIVITIES_GET_BY_STUDENT_PENDING });
        const { studentId, callback } = action.payload;
        const payload = yield call(API.getActivitiesByStudent, studentId);
        yield put({ type: actions.ACTIVITIES_GET_BY_STUDENT_FULFILLED, payload });

        if (callback) {
            callback();
        }
    }
    catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.ACTIVITIES_GET_BY_STUDENT_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

function* get(action) {
    try {
        yield put({ type: actions.ACTIVITIES_GET_PENDING });
        const { activityId, callback } = action.payload;
        const payload = yield call(API.get, activityId);
        yield put({ type: actions.ACTIVITIES_GET_FULFILLED, payload });

        if (callback) {
            callback();
        }
    }
    catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.ACTIVITIES_GET_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

export default function*() {
    yield takeEvery(actions.ACTIVITIES_CREATE, create);
    yield takeEvery(actions.ACTIVITIES_GET_BY_STUDENT, getByStudent);
    yield takeEvery(actions.ACTIVITIES_GET, get);
}