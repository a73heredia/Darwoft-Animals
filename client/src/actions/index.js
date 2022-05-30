import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_DOG_BY_NAME = 'GET_DOG_BY_NAME';
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID';
export const ADD_TO_CART = 'ADD_TO_CART';
export const FILL_CART = 'FILL_CART';
export const ADD_ONE_TO_CART = 'ADD_ONE_TO_CART'
export const RM_ONE_TO_CART = 'RM_ONE_TO_CART'
export const RM_ALL = 'RM_ALL'
export const RM_DETAIL = 'RM_DETAIL'

export function getDogs() {
    return function (dispatch) {
        return axios.get('http://localhost:5000/api/dogs', {})
            .then((json) => {
                return dispatch({
                    type: GET_DOGS,
                    payload: json.data,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export function getDogByName(name) {
    return async function (dispatch) {
        try {

            var info = await axios.get('http://localhost:5000/api/dogs?name=' + name);
            console.log(info.data, 'hola')
            return dispatch({
                type: GET_DOG_BY_NAME,
                payload: info.data

            })

        }
        catch (e) {
            console.log(e);
        }

    }
}

export function getDogById(id) {
    return (dispatch) => {
        axios.get('http://localhost:5000/api/dog/' + id)
            .then(res => {
                dispatch({
                    type: GET_DOG_BY_ID,
                    payload: res.data
                })
            })
    }
}

export function addToCart(dog, amount) {
    return {
        type: ADD_TO_CART,
        payload: { dog, amount },
    };
}


export function fillCart(dogLs) {
    return {
        type: FILL_CART,
        payload: dogLs,
    };
}

export function addOneToCart(id) {
    return {
        type: ADD_ONE_TO_CART,
        payload: id,
    };
}

export function rmOneToCart(id) {
    return {
        type: RM_ONE_TO_CART,
        payload: id,
    };
}

export function confirm(payload) {
    return async function () {
        let json = await axios.post(
            "localhost:3001/adopt",
            payload);
        return json;
    };
}

export function rmDetail() {
    return {
        type: RM_DETAIL,
        payload: [],
    };
}