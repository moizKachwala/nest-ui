import { combineReducers } from 'redux';

import menu from './menu';
import chat from './chat';
import session from './session';

export const rootReducer = combineReducers({
    chat,
    menu,
    session,
});

export default rootReducer;