/**
 * .app/js/actions/index.js
 */

import * as constants from '../constants';

export const addInventory = inventory => ({ 
    type: constants.ADD_INVENTORY, 
    payload: inventory
});

export const addProduct = (product, inv_id) => ({
    type: constants.ADD_PRODUCT,
    inv_id: inv_id,
    payload: product
});

export const requestData = () => ({
    type: constants.REQUEST_DATA
});

export const recieveData = () => ({
    type: constants.RECIEVE_DATA
})
