// 如果是开发模式，store 采用此配置

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import {callTraceMiddleware,getReloadStore} from "middlewares/reloadStore"

const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    getReloadStore(preloadedState),
    applyMiddleware(sagaMiddleware, createLogger())
  );
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer)
    })
  }
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};

export const store = configureStore(window.__INITIAL_STATE__);
