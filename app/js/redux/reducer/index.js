/**
 * .app/js/redux/reducer/index.js
 */

import history from '../../history';
import * as constants from '../constants';
import initialState from '../init';

// Helper functions
const removeItem = (array, itemId, key = 'id') => {
    let new_array = array.slice();

    let item = array.find(item => item[key] == itemId);
    let index = array.indexOf(item);
    new_array.splice(index, 1);

    return new_array;
}

const saveStore =  (store) => {
    if(localStorage){
        store = JSON.stringify(store);
        localStorage.setItem('store_pal_store', store)
    }

    return true;
}

// Utility functions
const updateObject = (oldObj, newValues) => {
    return Object.assign({}, oldObj, newValues);
}

const updateItemArray = (array, itemId, callback, key = 'id') => {
    const updatedItems = array.map( item => {
        if( item[key] !== itemId ){
            return item;
        }

        const updatedItem = callback(item);
        return updatedItem
    });

    return updatedItems;
}

// Case reducers
const add_product = (state, action) => {
    const new_product = state.products.concat(action.payload);

    return updateObject(state, {
        products: new_product
    });
}

const edit_product = (state, action) => {
    const new_product = updateItemArray(state.products, action.product_id, item => {
        return updateObject(item, action.product);
    });

    return updateObject(state, {
        products: new_product
    });
}

const delete_product = (state, action) => {
    const new_product = removeItem(state.products, action.product_id);

    return updateObject(state, {
        products: new_product
    });
}

const product_sold = (state, action) => {
    const new_sale = state.sold_items.concat(action.payload);
    const new_product = updateItemArray(state.products, action.product_id, item => {
        return updateObject(item, {
            ...item,
            quantity: item.quantity - action.payload.quantity_sold
        });
    });
    let new_creditor = state.creditors;

    if (action.payload.on_credit){
        const creditor = state.creditors.find(creditor => creditor.name == action.payload.creditor_name);
        if( creditor == undefined ){
            new_creditor = state.creditors.concat({
                name: action.payload.creditor_name,
                total_ammount_owing: action.payload.ammount_owing,
                items_owing: [{
                    id: action.product_id,
                    name: action.payload.product_name,
                    ammount_owing: action.payload.ammount_owing,
                    date_purchased: action.payload.date_sold
                }]
            });
        } else {
            new_creditor = updateItemArray(state.creditors, action.payload.creditor_name, item => {
                return updateObject(item, {
                    ...item,
                    total_ammount_owing: item.total_ammount_owing + action.payload.ammount_owing,
                    items_owing: [...item.items_owing, {
                        id: action.product_id,
                        name: action.payload.product_name,
                        ammount_owing: action.payload.ammount_owing,
                        date_purchased: action.payload.date_sold
                    }]
                })
            }, 'name')
        }
    }
    console.log('creditor', new_creditor);

    return updateObject(state, {
        products: new_product,
        sold_items: new_sale,
        creditors: new_creditor
    });
}

const credit_paid = (state, action) => {
    let new_credit = updateItemArray(state.creditors, action.payload.creditor_name, creditor => {
        return updateObject(creditor, {
            ...creditor,
            total_ammount_owing: creditor.total_ammount_owing - action.payload.ammount_paid,
            items_owing: updateItemArray(creditor.items_owing, action.payload.product_id, item => {
                return updateObject(item, {
                    ...item,
                    ammount_owing: item.ammount_owing - action.payload.ammount_paid
                })
            })
        })
    }, 'name');

    const creditor = new_credit.find(creditor => creditor.name == action.payload.creditor_name);

    if( creditor.total_ammount_owing == 0){
        new_credit = removeItem(state.creditors, action.payload.creditor_name, 'name');
        history.push('/creditors');
    }

    return updateObject(state, {
        creditors: new_credit
    });
}

// Root reducer
const root_reducer = (state = initialState, action) => {
    switch( action.type ){
        case constants.ADD_PRODUCT: return add_product(state, action);
        case constants.EDIT_PRODUCT: return edit_product(state, action);
        case constants.DELETE_PRODUCT: return delete_product(state, action);
        case constants.PRODUCT_SOLD: return product_sold(state, action);
        case constants.CREDIT_PAID: return credit_paid(state, action);
        default: return state;
    }
}

export default root_reducer;