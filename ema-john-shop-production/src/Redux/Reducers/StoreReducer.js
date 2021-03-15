import { ADD_ALL_PRODUCT, ADD_ALL_SUPPLIER, ADD_ALL_USERS, ADD_CATEGORY, ADD_TO_CART, ADD_USER, FETCH_ALL_ORDERS, FETCH_SELLER_INFO, REMOVE_FROM_CART } from "../Actions/StoreActions";

const initialState = {
    user: {},
    cart: [],
    categories: [],
    products: [],
    orders: [],
    sellers: [],
    allUsers: [],
    allSuppliers: []
}

export const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                user: action.userDetails
            }
        case ADD_TO_CART:
            return {
                ...state,
                cart: funcToAddCart(state.cart, action.product)
            }
        case REMOVE_FROM_CART:
            const remaingFoods = state.cart.filter(food => food._id !== action.id);
            return {
                ...state,
                cart : remaingFoods
            }
        case ADD_CATEGORY:
            return{
                ...state,
                categories : action.category
            }
        case ADD_ALL_PRODUCT:
            return{
                ...state,
                products : action.product
            }
        case FETCH_ALL_ORDERS:
            return {
                ...state,
                orders: action.orders
            }
        case FETCH_SELLER_INFO:
            return{
                ...state,
                sellers: action.sellers
            }
        case ADD_ALL_USERS:
            return{
                ...state,
                allUsers: action.users
            }
        case ADD_ALL_SUPPLIER:
            return{
                ...state,
                allSuppliers: action.suppliers
            }
        default:
            return state;
    }
}

const funcToAddCart = (cartItems, cartItemToAdd) =>{
    const existingCartItem = cartItems.find(item => item._id === cartItemToAdd._id);
    if (existingCartItem) {
        const dfdf = cartItems.map(item =>
        item._id === cartItemToAdd._id
            ? { ...cartItemToAdd, quantity: item.quantity + cartItemToAdd.quantity }
            : item
        );
        return dfdf;
    }  
    return [...cartItems, { ...cartItemToAdd, quantity: cartItemToAdd.quantity }];
}