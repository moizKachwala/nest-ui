import { combineReducers } from 'redux';

import menu from './menu';
import chat from './chat';
import session from './session';
import students from './students';
import activityTypes from './activityTypes';
import activities from './activities';
import activityAssignments from './activityAssignments';

export const rootReducer = combineReducers({
    chat,
    menu,
    session,
    students,
    activityTypes,
    activities,
    activityAssignments,
});

export default rootReducer;