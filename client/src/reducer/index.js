import { GET_DOGS, GET_DOG_BY_ID, GET_DOG_BY_NAME, ADD_TO_CART, FILL_CART, ADD_ONE_TO_CART, RM_ONE_TO_CART, RM_ALL, RM_DETAIL } from '../actions';

const initialState = {
    dogs: [],
    dogsBkp: [],
    detail: [],
    cart: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                dogsBkp: action.payload,
            }
        case GET_DOG_BY_NAME:
            if (action.payload.length < 1) {
                alert('Not Found')

            } else {

                return {
                    ...state,
                    dogs: action.payload
                }
            }

        case GET_DOG_BY_ID:
            return {
                ...state,
                detail: action.payload,

            }
        case ADD_TO_CART:
            let { dog } = action.payload;
            console.log(dog, 'reducer')
            let cartUpdated;
            //si ya existe
            if (state.cart.some((e) => e.id === dog[0].id)) {
                cartUpdated = state.cart.map((e) => {
                    if (e.id === dog[0].id) {
                        //cada vez que se haga add to cart al mismo producto, la cantidad aumentará
                        e.amount++;
                        return e;
                    } else return e;
                });
            } else {
                cartUpdated = [
                    ...state.cart,
                    {
                        img: dog[0].image,
                        name: dog[0].name,
                        id: dog[0].id,
                        amount: 1,
                    },
                ];
            }
            localStorage.setItem("cart", JSON.stringify(cartUpdated));

            return {
                ...state,
                cart: cartUpdated,
            };
        case FILL_CART:
            return {
                ...state,
                cart: action.payload,

            }

        case ADD_ONE_TO_CART:
            return {
                ...state,
                cart: state.cart.map(el => el.id === action.payload ? { ...el, amount: el.amount + 1 } : el)
            }

        case RM_ONE_TO_CART:
            let itemToDelete = state.cart.find(el => el.id === action.payload)
            return itemToDelete.amount > 0 ? {
                ...state,
                cart: state.cart.map(el => el.id === action.payload ? { ...el, amount: el.amount - 1 } : el)
            } : { ...state, cart: state.cart.filter(el => el.id !== action.payload) }

        case RM_ALL:
            return {
                ...state, cart: state.cart.filter(el => el.id !== action.payload)

            }

        case RM_DETAIL:
            return {
                ...state,
                detail: action.payload,

            }

        default:
            return state
    }


}




export default rootReducer;
