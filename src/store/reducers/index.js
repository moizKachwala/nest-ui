import { combineReducers } from 'redux';

import menu from './menu';
import chat from './chat';
import session from './session';
import students from './students';
import activityTypes from './activityTypes';
import activities from './activities';

export const rootReducer = combineReducers({
    chat,
    menu,
    session,
    students,
    activityTypes,
    activities,
});

export default rootReducer;