import sagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';

export const reduxSagaMiddleware = sagaMiddleware();

export function initSagas() {
    reduxSagaMiddleware.run(function* sagas() {
        yield fork(require('./sagas/chat').default);
        yield fork(require('./sagas/session').default);
        yield fork(require('./sagas/students').default);
        yield fork(require('./sagas/activityTypes').default);
        yield fork(require('./sagas/activities').default);
    });
}