/**
 * .app/js/redux/actions/index.js
 */

import * as constants from '../constants';

export const requestToken = () => ({
    type: constants.REQUEST_TOKEN
});

export const recieveToken = (res) => ({
    type: constants.RECIEVE_TOKEN,
    refresh_token: res.refresh_token
});

export const didInvalidate = () => ({
    type: constants.DID_INVALIDATE
});

export const addProduct = (product, inv_id) => ({
    type: constants.ADD_PRODUCT,
    inv_id: inv_id,
    payload: product
});

export const requestData = () => ({
    type: constants.REQUEST_DATA
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
            (res) => {
                dispatch(recieveToken(res));
            },
            (error) => console.log('Error: ' + error)
        )
    }
};

export const login_user = (data) => {
    return dispatch => {
        dispatch(requestToken());

        const headers = {
            method: 'POST',
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }

        return fetch('http://127.0.0.1:5000/login', headers).then(
            resp => resp.json()
        ).then(
            (res) => {
                if(res.msg == 'Wrong password' || res.msg == 'Wrong email'){
                    dispatch(didInvalidate());
                } else {
                    dispatch(recieveToken(res));
                }
            },
            (error) => console.log('Error: ' + error)
        )
    }
};

export const logout_user = () => ({
    type: constants.LOGOUT_USER
});

export const fetch_data = (r_token, cb) => {
    return dispatch => {
        dispatch(requestData());

        const headers = (token) => {
            return {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
            }
        }

        return fetch('http://127.0.0.1:5000/refresh', headers(r_token)).then(
            resp => resp.json()
        ).then(
            (res) => (sessionStorage.setItem('token', res.access_token))
        ).then(
            res => {
                let a_token = sessionStorage.token;
                fetch('http://127.0.0.1:5000/', headers(a_token)).then(
                    res => res.json()
                ).then(
                    (res) => dispatch(recieveData(res)),
                    (error) => console.log(error)
                ).then(
                    res => cb()
                )
            }
        )
    }
};

export const fetch_from_store = () => ({
    type: constants.FETCH_FROM_STORE
});

export const addInventory = (r_token, inventory, cb) => { 
    return dispatch => {

        const headers = (method, token) => {
            return {
                method: method,
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
            }
        }

        return fetch('http://127.0.0.1:5000/refresh', headers('GET', r_token)).then(
            resp => resp.json()
        ).then(
            (res) => {
                let a_token = res.access_token;
                fetch('http://127.0.0.1:5000/inventory/' + inventory,
                headers('POST', a_token)).then(
                    res => res.json()
                ).then(
                    (res) => dispatch(fetch_data(r_token, cb)),
                    (error) => console.log(error)
                )
            }
        )
    }
}

export const deleteInventory = (r_token, inventory, cb) => {
    return dispatch => {

        const headers = (method, token) => {
            return {
                method: method,
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
            }
        }

        return fetch('http://127.0.0.1:5000/refresh', headers('GET', r_token)).then(
            resp => resp.json()
        ).then(
            (res) => {
                let a_token = res.access_token;
                fetch('http://127.0.0.1:5000/inventory/' + inventory,
                headers('DELETE', a_token)).then(
                    res => res.json()
                ).then(
                    (res) => dispatch(fetch_data(r_token, cb)),
                    (error) => console.log(error)
                )
            }
        )
    }
};
