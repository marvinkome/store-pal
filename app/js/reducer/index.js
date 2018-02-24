/**
 * .app/js/reducer/index.js
 */

import * as constants from '../constants';

const initialState = {
    isFetching: false,
    isLoggingIn: false,
    didInvalidate: false,
    lastFetch: '',
    access_token: '',
    items: {
        id: 0,
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        inventories: [
            {
                id: 0,
                name: 'Inventory Name from Redux',
                products: [
                    {
                        id: 0,
                        name: 'Product name from Redux',
                        quantity: 0
                    }
                ]
            }
        ]
    }
};

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
            state.access_token =  action.access_token;

            saveToken(action.refresh_token);
            return state;

        case constants.LOGOUT_USER:      
            state.access_token =  '';
            localStorage.removeItem('loggedIn');

            return state;

        case constants.REQUEST_DATA:
            state.isFetching = true;
            return state;

        case constants.RECIEVE_DATA:
            state.isFetching = true;
            state.lastFetch = Date.now();
            state.items = action.data;
            return state;

        case constants.ADD_INVENTORY:
            Object.assign(state.items, {
                inventories: [...state.items.inventories, action.payload]
            });
            return state;
        case constants.ADD_PRODUCT:
            const inventory = state.items.inventories.find( inv => inv.id == action.inv_id);
            Object.assign(inventory, {
                products: [...inventory.products, action.payload]
            });
            return state;
        default:
            return state;
    }
};

export default rootReducer;