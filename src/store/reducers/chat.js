import { createReducer } from '../../utils';
import * as actions from '../actions/chat';

const initialStatusState = {
    error: false,
    errorMessage: '',
    pending: false,
};


// {
//     "title": "My Favorite Animal",
//     "hint": "Write about your favorite animal, where it lives, what it eats, and why you like it."
// },
// {
//     "title": "My Family",
//     "hint": "Introduce your family members, their names, what they do, and how they make you feel."
// },
// {
//     "title": "A Day at the Beach",
//     "hint": "Describe your experience at the beach, what you saw, what you did, and what you learned."
// },
// {
//     "title": "My Best Friend",
//     "hint": "Write about your best friend, what you like to do together, and why you enjoy their company."
// },
// {
//     "title": "My Hobbies",
//     "hint": "Share your hobbies, what you like to do, and why you enjoy them."
// },
// {
//     "title": "My Favorite Food",
//     "hint": "Write about your favorite food, what it tastes like, how it's made, and why you like it."
// },
// {
//     "title": "My Dream Vacation",
//     "hint": "Describe your dream vacation, where you would go, what you would do, and why you want to go there."
// },
// {
//     "title": "My School",
//     "hint": "Introduce your school, what you learn, who your teachers are, and what you like about it."
// },
// {
//     "title": "My Favorite Book",
//     "hint": "Write about your favorite book, what it's about, who the characters are, and why you like it."
// },
// {
//     "title": "My Favorite Season",
//     "hint": "Describe your favorite season, what the weather is like, what you do, and why you like it."
// }

const initialState = {
    list: [],
    titles: [
    ],
    validations: {},
    getList: {
        ...initialStatusState,
    },
    getTitle: {
        ...initialStatusState,
    },
    validate: {
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
    }),
    [actions.CHAT_GET_ESSAY_TITLES_PENDING]: (state) => ({
        ...state,
        getTitle: {
            pending: true,
        },
    }),
    [actions.CHAT_GET_ESSAY_TITLES_FULFILLED]: (state, titles = []) => ({
        ...state,
        getTitle: {
            ...initialStatusState,
        },
        titles,
    }),
    [actions.CHAT_GET_ESSAY_TITLES_REJECTED]: (state, errorMessage) => ({
        ...state,
        getTitle: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.CHAT_VALIDATE_ESSAY_PENDING]: (state) => ({
        ...state,
        validate: {
            pending: true,
        },
    }),
    [actions.CHAT_VALIDATE_ESSAY_FULFILLED]: (state, validations) => ({
        ...state,
        validate: {
            ...initialStatusState,
        },
        validations,
    }),
    [actions.CHAT_VALIDATE_ESSAY_REJECTED]: (state, errorMessage) => ({
        ...state,
        validate: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
});