import { createReducer } from '../../utils';
import * as actions from '../actions/activities';

const initialStatusState = {
    error: false,
    errorMessage: '',
    pending: false,
};

const initialState = {
    data: [],
    activity: {},
    get: {
        ...initialStatusState,
    },
    create: {
        ...initialStatusState,
    }
};

export default createReducer(initialState, {
    [actions.ACTIVITIES_GET_PENDING]: (state) => ({
        ...state,
        get: {
            pending: true,
        },
    }),
    [actions.ACTIVITIES_GET_FULFILLED]: (state, activity) => ({
        ...state,
        get: {
            ...initialStatusState,
        },
        activity,
    }),
    [actions.ACTIVITIES_GET_REJECTED]: (state, errorMessage) => ({
        ...state,
        get: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.ACTIVITIES_CREATE_PENDING]: (state) => ({
        ...state,
        create: {
            pending: true,
        },
    }),
    [actions.ACTIVITIES_CREATE_FULFILLED]: (state) => ({
        ...state,
        create: {
            ...initialStatusState,
        },
    }),
    [actions.ACTIVITIES_CREATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        create: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
});