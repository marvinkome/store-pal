/**
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

export default initialState;