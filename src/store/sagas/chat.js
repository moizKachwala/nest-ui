import { takeEvery, put, call } from 'redux-saga/effects';

import * as actions from '../actions/chat';
import * as API from '../api/chat';
import { sessionErrorHandling } from './session';

function* getList(action) {
    try {
        yield put({ type: actions.CHAT_GET_RESPONSE_PENDING });
        const {
            chatPayload
        } = action.payload;
        const payload = yield call(API.getList, chatPayload);
        yield put({ type: actions.CHAT_GET_RESPONSE_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.CHAT_GET_RESPONSE_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

function* getTitles(action) {
    try {
        yield put({ type: actions.CHAT_GET_ESSAY_TITLES_PENDING });
        const payload = yield call(API.getTitles);
        yield put({ type: actions.CHAT_GET_ESSAY_TITLES_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.CHAT_GET_ESSAY_TITLES_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

function* getMcqQuestions(action) {
    try {
        yield put({ type: actions.CHAT_GET_MCQ_QUESTIONS_PENDING });
        const {
            questionPayload
        } = action.payload;
        const payload = yield call(API.getMcqQuestions, questionPayload);
        yield put({ type: actions.CHAT_GET_MCQ_QUESTIONS_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.CHAT_GET_MCQ_QUESTIONS_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}


function* validateEssay(action) {
    try {
        yield put({ type: actions.CHAT_VALIDATE_ESSAY_PENDING });
        const {
            essay
        } = action.payload;
        const payload = yield call(API.validateEssay, essay);        
        yield put({ type: actions.CHAT_VALIDATE_ESSAY_FULFILLED, payload });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.CHAT_VALIDATE_ESSAY_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

// export function* reset() {
//     yield put({ type: actions.CHAT_GET_RESPONSE_RESET });
// }

export default function*() {
    yield takeEvery(actions.CHAT_GET_RESPONSE, getList);
    yield takeEvery(actions.CHAT_GET_ESSAY_TITLES, getTitles);
    yield takeEvery(actions.CHAT_GET_MCQ_QUESTIONS, getMcqQuestions);
    yield takeEvery(actions.CHAT_VALIDATE_ESSAY, validateEssay);
}