import { createReducer } from '../../utils';
import * as actions from '../actions/activities';

const initialStatusState = {
    error: false,
    errorMessage: '',
    pending: false,
};

const initialState = {
    list: [],
    create: {
        ...initialStatusState,
    },
};

export default createReducer(initialState, {
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
});