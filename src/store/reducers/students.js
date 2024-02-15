import { createReducer } from '../../utils';
import * as actions from '../actions/students';

const initialStatusState = {
    error: false,
    errorMessage: '',
    pending: false,
};

const initialState = {
    data: [],
    list: {
        ...initialStatusState,
    },
};

export default createReducer(initialState, {
    [actions.STUDENTS_GET_BY_PARENT_LIST_PENDING]: (state) => ({
        ...state,
        list: {
            pending: true,
        },
        data: []
    }),
    [actions.STUDENTS_GET_BY_PARENT_LIST_FULFILLED]: (state, students) => ({
        ...state,
        list: {
            ...initialStatusState,
        },
        data: students,
    }),
    [actions.STUDENTS_GET_BY_PARENT_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        list: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.STUDENTS_RESET]: () => ({ ...initialState }),
});
