/**
 * .app/js/redux/reducer/index.js
 */

import * as constants from '../constants';
import initialState from '../init';

const saveToken = (token) => {
    if (localStorage){
        localStorage.setItem('token', token);
        localStorage.setItem('loggedIn', true);
    }
    console.log('token saved');
};

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case constants.REQUEST_TOKEN:
            state.isLoggingIn = true;
            return state;

        case constants.DID_INVALIDATE:
            state.didInvalidate = true;
            state.isLoggingIn = false;
            return state;
        case constants.RECIEVE_TOKEN:
            state.isLoggingIn = false;  
            state.didInvalidate = false;    
            saveToken(action.refresh_token);
            return state;

        case constants.LOGOUT_USER:  
            localStorage.removeItem('loggedIn');
            return state;

        case constants.REQUEST_DATA:
            state.isFetching = true;
            return state;

        case constants.RECIEVE_DATA:
            state.isFetching = false;
            state.lastFetch = Date.now();
            state.items = action.data;
            if(localStorage){
                localStorage.state = JSON.stringify(state.items)
            }
            return state;
        case constants.FETCH_FROM_STORE:
            const items = JSON.parse(localStorage.getItem('state'))    
            state.items = items;
            return state
    
        default:
            return state;
    }
};

export default rootReducer;