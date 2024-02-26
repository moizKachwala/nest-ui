import { createSelector } from "reselect";

export const selectAuthenticated = (state) => state.session.authenticated;

export const selectSessionUser = (state) => state.session.user;

export const selectLoginPending = createSelector(
    (state) => state.session,
    (session) => session.login['pending'] || session.construct['pending']
);

export const selectLoginErrorMessage = createSelector(
    (state) => state.session,
    (session) => session.login['errorMessage'] || session.construct['errorMessage']
);

export const selectLoginError = createSelector(
    (state) => state.session,
    (session) => session.login['error']
);

export const selectUserRole = createSelector(
    selectSessionUser,
    (sessionUser) => {
        if(sessionUser.roles.length > 0) {
            const userRole = sessionUser.roles[0];
            return userRole.name;
        }
    }
);

export const getAssociatedId = createSelector(
    selectSessionUser,
    selectUserRole,
    (sessionUser, userRole) => {
        return sessionUser[userRole.toLowerCase()]?.id;
    }
);