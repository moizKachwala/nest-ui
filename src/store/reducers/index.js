import { combineReducers } from 'redux';

import menu from './menu';
import chat from './chat';
import session from './session';
import students from './students';

export const rootReducer = combineReducers({
    chat,
    menu,
    session,
    students,
});

export default rootReducer;