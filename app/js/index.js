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
import store from './redux/store';
import { Provider } from 'react-redux';

// Components
import App from '../components/App.jsx';

// css && materialize js
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../css/style.css';
import '../../node_modules/jquery/dist/jquery.min';
import '../../node_modules/materialize-css/dist/js/materialize.min.js';

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