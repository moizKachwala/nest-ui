import { createReducer } from '../../utils';
import * as actions from '../actions/activityAssignments';

const initialStatusState = {
    error: false,
    errorMessage: '',
    pending: false,
};

const initialState = {
    data: [],
    activity: {},
    list: {
        ...initialStatusState,
    },
    get: {
        ...initialStatusState,
    },
    submit: {
        ...initialStatusState,
    }
};

export default createReducer(initialState, {
    [actions.ACTIVITY_ASSIGNMENTS_BY_ID_PENDING]: (state) => ({
        ...state,
        get: {
            pending: true,
        },
    }),
    [actions.ACTIVITY_ASSIGNMENTS_BY_ID_FULFILLED]: (state, activity) => ({
        ...state,
        get: {
            ...initialStatusState,
        },
        activity,
    }),
    [actions.ACTIVITY_ASSIGNMENTS_BY_ID_REJECTED]: (state, errorMessage) => ({
        ...state,
        get: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.ACTIVITY_ASSIGNMENTS_BY_STUDENT_PENDING]: (state) => ({
        ...state,
        list: {
            pending: true,
        },
        data: []
    }),
    [actions.ACTIVITY_ASSIGNMENTS_BY_STUDENT_FULFILLED]: (state, activities) => ({
        ...state,
        list: {
            ...initialStatusState,
        },
        data: activities,
    }),
    [actions.ACTIVITY_ASSIGNMENTS_BY_STUDENT_REJECTED]: (state, errorMessage) => ({
        ...state,
        list: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.ACTIVITY_ASSIGNMENTS_SUBMIT_PENDING]: (state) => ({
        ...state,
        submit: {
            pending: true,
        },
    }),
    [actions.ACTIVITY_ASSIGNMENTS_SUBMIT_FULFILLED]: (state, validations) => ({
        ...state,
        submit: {
            ...initialStatusState,
        },
        validations,
    }),
    [actions.ACTIVITY_ASSIGNMENTS_SUBMIT_REJECTED]: (state, errorMessage) => ({
        ...state,
        submit: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
});