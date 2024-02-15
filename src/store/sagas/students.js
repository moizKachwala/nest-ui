import { takeEvery, put, call, select } from 'redux-saga/effects';
import * as actions from '../actions/students';
import * as API from '../api/students';
import { sessionErrorHandling } from './session';

function* getByParent(action) {
    try {
        yield put({ type: actions.STUDENTS_GET_BY_PARENT_LIST_PENDING });
        const { parentId, callback } = action.payload;
        const payload = yield call(API.getStudentsByParent, parentId);
        yield put({ type: actions.STUDENTS_GET_BY_PARENT_LIST_FULFILLED, payload });

        if (callback) {
            callback();
        }
    }
    catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.STUDENTS_GET_BY_PARENT_LIST_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

// export function* reset() {
//     yield put({ type: actions.FACILITIES_RESET });
// }

export default function* () {
    yield takeEvery(actions.STUDENTS_GET_BY_PARENT_LIST, getByParent);
}