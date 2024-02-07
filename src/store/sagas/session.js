import { takeEvery, put, call, select } from 'redux-saga/effects';

import * as actions from '../actions/session';

import * as API from '../api/session';

import { toLocalStorage, fromLocalStorage } from '../../utils/storage';


function* login(action) {
    const { username, password, rememberMe } = action.payload;
    try {
        yield put({ type: actions.SESSION_LOGIN_PENDING });
        const payload = yield call(API.login, username, password);
        const { accessToken, user } = payload;

        yield toLocalStorage('authToken', accessToken);

        yield put({ type: actions.SESSION_LOGIN_FULFILLED, payload });
        yield toLocalStorage('rememberMe', rememberMe);

        if (rememberMe) {
            yield toLocalStorage('username', username);

        } else {
            yield toLocalStorage('username', '');
        }

        yield put({ type: actions.SESSION_CONSTRUCT, payload: { user, authToken: accessToken } });
    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.SESSION_LOGIN_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

function* construct(action) {
    const authToken = fromLocalStorage('authToken', null);

    if (!authToken) {
        yield put({ type: actions.SESSION_LOGOUT, payload: { manual: false } });
        return;
    }

    try {
        yield put({ type: actions.SESSION_CONSTRUCT_PENDING });
        // const user = yield call(API.getCurrentUser);
        // yield put({ type: actions.SESSION_USER_OBJECT, payload: { user } });

        // const roles = yield call(USERS_API.getUserRoles);
        // yield put({ type: usersActions.USERS_ROLES_LIST_FULFILLED, payload: roles });

        // // For superadmin and partner role, we need to show the dashboards based without RBAC
        // // for each clients, so if the clientId is of superadmin, then
        // // get the list of all the dashboards.
        // const { clientId, role, preferredDashboardClientId } = user;
        // const isSuperadminOrParter = (role === ROLE_SUPERADMIN || role === ROLE_PARTNER);
        // const fetchClientId = isSuperadminOrParter ? preferredDashboardClientId : clientId;
        // const dashboards = yield call(DASHBOARD_API.listDashboardsByClientId, fetchClientId, isSuperadminOrParter);
        // yield put({ type: dashboardActions.DASHBOARD_LIST_BY_CLIENT_ID_FULFILLED, payload: dashboards });


        // if (role === ROLE_SUPERADMIN || role === ROLE_PARTNER) {
        //     yield put({ type: dashboardActions.DASHBOARD_SWITCH_LIST_BY_CLIENT_ID, payload: { clientId: preferredDashboardClientId } });
        // }

        // // Get the list of clients in case of Admin and Partner
        // if (role === ROLE_SUPERADMIN || role === ROLE_PARTNER) {
        //     const payload = yield call(CLIENT_API.getClientsTiny);
        //     yield put({ type: clientActions.CLIENTS_LIST_TINY_FULFILLED, payload });
        // }

        yield put({ type: actions.SESSION_CONSTRUCT_FULFILLED });

    } catch (error) {
        const { error: errorMessage } = (error && error.payload) || { error: '' };
        yield put({ type: actions.SESSION_CONSTRUCT_REJECTED, payload: errorMessage });
        yield call(sessionErrorHandling, error);
    }
}

// export function* reset() {
//     // Clear other stuff from store.
//     yield toLocalStorage('authToken', null);

//     try {
//         yield all([
//             call(clientsReset),
//             call(usersReset),
//             call(rolesReset),
//             call(dashboardReset),
//             call(dashboardDataSourcesReset),
//             call(dashboardFiltersReset),
//             call(dashboardTypesReset),
//         ]);
//     } catch (error) {
//         throw error;
//     }
// }

// function* deconstruct() {
//     yield call(reset);
//     clearRefreshTimer();
// }

function* logout(action) {
    //const { manual } = action.payload;
    yield put({ type: actions.SESSION_DECONSTRUCT });
}

export function* sessionErrorHandling(error) {
    if (error && error.response) {
        const { response } = error;
        if (response.status === 401) {
            const constructPending = yield select((state) => state.session.construct.pending);
            if (constructPending) {
                yield put({ type: actions.SESSION_CONSTRUCT_REJECTED, payload: error });
            }
            yield put({ type: actions.SESSION_LOGOUT, payload: { manual: false } });
            return;
        }
        return response.status;
    }
}

export default function* () {
    yield takeEvery(actions.SESSION_LOGIN, login);
    yield takeEvery(actions.SESSION_CONSTRUCT, construct);
    // yield takeEvery(actions.SESSION_DECONSTRUCT, deconstruct);
    yield takeEvery(actions.SESSION_LOGOUT, logout);
}