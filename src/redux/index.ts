import { sagaContext, rootReducer, rootSaga } from "./config";

import createSagaMiddleware from "redux-saga";
import environment from "src/environment";
import { run } from "redux-chill";

import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";

/**
 * Create redux store
 */
const setupRedux = () => {
  const sagaMiddleware = createSagaMiddleware({
    onError: (error) =>
      console.error(`Saga error, reason - [${error.message}]`),
  });

  const store = configureStore({
    reducer: rootReducer,
    devTools: environment.nodeEnv !== "production",
    enhancers: [applyMiddleware(sagaMiddleware)],
  });

  run(sagaMiddleware, rootSaga, sagaContext);

  return store;
};

export { setupRedux };
