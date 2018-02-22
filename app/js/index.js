/**
 * ./app/js/index.js
 */

// React import
import React from 'react';
import ReactDOM from 'react-dom';

// React route
import {Router, Route} from 'react-router-dom';
import history from './history.js';

// Redux
import store from './store/index';
import { Provider } from 'react-redux';

// Components
import App from '../components/App.jsx';

window.store = store;

const elem = (
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>
);

ReactDOM.render(
    elem,
    document.getElementById('root')
);