/**
 * .app/js/store/index.js
 */

<<<<<<< HEAD
import { createStore } from "redux";
import rootReducer from "../reducer/index";

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
=======
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer";

const logger = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        logger
    )
);

export default store;
>>>>>>> master
