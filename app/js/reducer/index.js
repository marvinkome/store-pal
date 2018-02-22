/**
 * .app/js/reducer/index.js
 */

import { ADD_INVENTORY, ADD_PRODUCT } from '../constants';

const initialState = {
    isFetching: false,
    didInvalidate: false,
    lastFetch: Date.now(),
    items: {
        id: 0,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
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

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_INVENTORY:
            Object.assign(state.items, {
                inventories: [...state.items.inventories, action.payload]
            });
            return state;
        case ADD_PRODUCT:
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