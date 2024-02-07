import { createSelector } from "reselect";

export const selectAuthenticated = (state) => state.session.authenticated;

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