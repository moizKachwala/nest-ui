import { createReducer } from '../../utils';
import * as actions from '../actions/activityTypes';

const initialStatusState = {
    error: false,
    errorMessage: '',
    pending: false,
};

const initialState = {
    list: [],
    getList: {
        ...initialStatusState,
    },
};

export default createReducer(initialState, {
    
    [actions.ACTIVITY_TYPES_LIST_PENDING]: (state) => ({
        ...state,
        getList: {
            pending: true,
        },
    }),
    [actions.ACTIVITY_TYPES_LIST_FULFILLED]: (state, list = []) => ({
        ...state,
        getList: {
            ...initialStatusState,
        },
        list,
    }),
    [actions.ACTIVITY_TYPES_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        getList: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
});