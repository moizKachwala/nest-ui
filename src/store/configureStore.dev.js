import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import rootReducer from './reducers'
import {thunk} from 'redux-thunk'

import { reduxSagaMiddleware, initSagas } from './sagas.js';

export default function storeCofiguration(preloadedState) {
    
    const middlewares = [reduxSagaMiddleware, thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);
  
    const enhancers = [middlewareEnhancer];

    const store = configureStore({
      reducer: rootReducer,
      preloadedState: preloadedState,
      enhancers: (getDefaultEnhancers) => {
        return getDefaultEnhancers().concat(enhancers)
      },
    });
  
    initSagas();

    return {store};
}