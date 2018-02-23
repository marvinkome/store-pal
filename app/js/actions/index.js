/**
 * .app/js/actions/index.js
 */

import * as constants from '../constants';

export const requestToken = () => ({
    type: constants.REQUEST_TOKEN
});

export const recieveToken = (res) => ({
    type: constants.RECIEVE_TOKEN,
    access_token: res.access_token,
    refresh_token: res.refresh_token
});

export const addInventory = inventory => ({ 
    type: constants.ADD_INVENTORY, 
    payload: inventory
});

export const addProduct = (product, inv_id) => ({
    type: constants.ADD_PRODUCT,
    inv_id: inv_id,
    payload: product
});

export const requestData = (token) => ({
    type: constants.REQUEST_DATA,
    token: token
});

export const recieveData = (data) => ({
    type: constants.RECIEVE_DATA,
    data: data
});


export function register_user(data){
    return dispatch => {
        dispatch(requestToken());

        const headers = {
            method: 'POST',
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                name: data.name
            }),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }

        return fetch('http://127.0.0.1:5000/register', headers).then(
            resp => resp.json()
        ).then(
            (res) => {dispatch(recieveToken(res));},
            (error) => console.log('Error: ' + error)
        )
    }
};
