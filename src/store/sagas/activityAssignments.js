import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from '../actions/activityAssignments';
import * as API from '../api/activityAssignments';
import { sessionErrorHandling } from './session';

function* get(action) {
    try {
        yield put({ type: actions.ACTIVITY_ASSIGNMENTS_BY_ID_PENDING });
        const { activityAssignmentId, callback } = action.payload;
        const payload = yield call(API.get, activityAssignmentId);
        yield put({ type: actions.ACTIVITY_ASSIGNMENTS_BY_ID_FULFILLED, payload });

        if (callback) {
            callback();
        }
    }
    catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.ACTIVITY_ASSIGNMENTS_BY_ID_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

function* getByStudent(action) {
    try {
        yield put({ type: actions.ACTIVITY_ASSIGNMENTS_BY_STUDENT_PENDING });
        const { studentId, callback } = action.payload;
        const payload = yield call(API.getActivitiesByStudent, studentId);
        yield put({ type: actions.ACTIVITY_ASSIGNMENTS_BY_STUDENT_FULFILLED, payload });

        if (callback) {
            callback();
        }
    }
    catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.ACTIVITY_ASSIGNMENTS_BY_STUDENT_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

function* submitAssignment(action) {
    try {
        yield put({ type: actions.ACTIVITY_ASSIGNMENTS_SUBMIT_PENDING });
        const {
            assignmentId,
            response,
            callback
        } = action.payload;
        const payload = yield call(API.submitAssignment, assignmentId, response);        
        yield put({ type: actions.ACTIVITY_ASSIGNMENTS_SUBMIT_FULFILLED, payload });

        if (callback) {
            callback();
        }
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.ACTIVITY_ASSIGNMENTS_SUBMIT_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

export default function*() {
    yield takeEvery(actions.ACTIVITY_ASSIGNMENTS_BY_ID, get);
    yield takeEvery(actions.ACTIVITY_ASSIGNMENTS_BY_STUDENT, getByStudent);
    yield takeEvery(actions.ACTIVITY_ASSIGNMENTS_SUBMIT, submitAssignment);
}