/**
<<<<<<< HEAD
 * .app/js/redux/reducer/index.js
 */


let initialState = null;

if (localStorage && localStorage.store_pal_store){
    initialState = JSON.parse(localStorage.getItem('store_pal_store'))
} else {
    initialState = {
        id: 0,
        name: 'Anonymous',
        email: 'unknown@known.com',
        products: [
            // {
            //     id: 0,
            //     name: 'product name',
            //     price: 10,
            //     quantity: 10,
            // }
        ],
        sold_items: [
            // {
            //     product_name: 'product name',
            //     quantity_sold: 0,
            //     date_sold: 0,
            //     ammount_paid: 10,
            //     change_remaining: 0,
            //     on_credit: false,
            //     creditor_name: '',
            //     ammount_owing: 0
            // },
            // {
            //     product_name: 'product name',
            //     quantity_sold: 0,
            //     date_sold: 0,
            //     ammount_paid: 7,
            //     change_remaining: 0,
            //     on_credit: true,
            //     creditor_name: 'creditor name',
            //     ammount_owing: 3
            // }
        ],
        creditors: [
            // {
            //     name: 'creditor name',
            //     total_ammount_owing: 10,
            //     items_owing: [
            //         {
            //             id: 0,
            //             name: 'product name',
            //             ammount_owing: 10,
            //             date_purchased: 0
            //         }
            //     ]
            // }
        ]
    };
}
=======
 * .app/js/redux/init.js
 */

const initialState = {
    isFetching: false,
    isLoggingIn: false,
    didInvalidate: false,
    lastFetch: '',
    items: {
        id: 0,
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        inventories: []
    }
};
>>>>>>> master

export default initialState;