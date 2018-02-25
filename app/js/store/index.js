/**
 * .app/js/store/index.js
 */

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer/index";

const logger = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        logger
    )
);

export default store;
