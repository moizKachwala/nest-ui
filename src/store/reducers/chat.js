import { createReducer } from '../../utils';
import * as actions from '../actions/chat';

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
    [actions.CHAT_GET_RESPONSE_PENDING]: (state) => ({
        ...state,
        getList: {
            pending: true,
        },
    }),
    [actions.CHAT_GET_RESPONSE_FULFILLED]: (state, list) => ({
        ...state,
        getList: {
            ...initialStatusState,
        },
        list,
    }),
    [actions.CHAT_GET_RESPONSE_REJECTED]: (state, errorMessage) => ({
        ...state,
        getList: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    })
});