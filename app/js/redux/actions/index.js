/**
 * .app/js/actions/index.js
 */

import * as constants from '../constants';

let nextId = 0;

export const addProduct = (product) => {
    let edited_product = Object.assign({}, product, {id: nextId+1})
    nextId = nextId + 1;
    return {
        type: constants.ADD_PRODUCT,
        payload: edited_product
    }
};

export const productSold = (id, sold_data) => ({
    type: constants.PRODUCT_SOLD,
    product_id: id,
    payload: sold_data
});

export const creditPaid = (payload) => ({
    type: constants.CREDIT_PAID,
    payload
});

export const editProduct = (product, product_id) => ({
    type: constants.EDIT_PRODUCT,
    product_id,
    product
});

export const deleteProduct = (product_id) => ({
    type: constants.DELETE_PRODUCT,
    product_id
});