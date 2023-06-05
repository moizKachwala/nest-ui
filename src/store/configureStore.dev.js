import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'

import { reduxSagaMiddleware, initSagas } from './sagas.js';

export default function storeCofiguration(preloadedState) {
    
    const middlewares = [reduxSagaMiddleware, thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);
  
    const enhancers = [middlewareEnhancer];

    const store = configureStore({
      reducer: rootReducer,
      preloadedState: preloadedState,
      enhancers: enhancers
    });
  
    initSagas();

    return {store};
}