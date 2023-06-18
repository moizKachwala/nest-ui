import { combineReducers } from 'redux';

import menu from './menu';
import chat from './chat';

export const rootReducer = combineReducers({
    chat,
    menu,
});

export default rootReducer;