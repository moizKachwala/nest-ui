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
    validations: '',
    list: {
        ...initialStatusState,
    },
    create: {
        ...initialStatusState,
    },
    get: {
        ...initialStatusState,
    },
    validate: {
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
    [actions.ACTIVITIES_GET_BY_STUDENT_PENDING]: (state) => ({
        ...state,
        list: {
            pending: true,
        },
        data: []
    }),
    [actions.ACTIVITIES_GET_BY_STUDENT_FULFILLED]: (state, activities) => ({
        ...state,
        list: {
            ...initialStatusState,
        },
        data: activities,
    }),
    [actions.ACTIVITIES_GET_BY_STUDENT_REJECTED]: (state, errorMessage) => ({
        ...state,
        list: {
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
        }
    }),
    [actions.ACTIVITIES_CREATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        create: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.ACTIVITIES_SUBMIT_PENDING]: (state) => ({
        ...state,
        validate: {
            pending: true,
        },
    }),
    [actions.ACTIVITIES_SUBMIT_FULFILLED]: (state, validations) => ({
        ...state,
        validate: {
            ...initialStatusState,
        },
        validations,
    }),
    [actions.ACTIVITIES_SUBMIT_REJECTED]: (state, errorMessage) => ({
        ...state,
        validate: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
});