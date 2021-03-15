export const ADD_USER = 'ADD_USER';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_ALL_PRODUCT = 'ADD_ALL_PRODUCT';
export const FETCH_ALL_ORDERS = 'FETCH_ALL_ORDERS';
export const FETCH_SELLER_INFO = 'FETCH_SELLER_INFO';
export const ADD_ALL_USERS = 'ADD_ALL_USERS';
export const ADD_ALL_SUPPLIER = 'ADD_ALL_SUPPLIER';

export const addSignedUser = userDetails => {
    return {
        type: ADD_USER,
        userDetails
    }
}

export const addToCart = product => {
    return {
        type: ADD_TO_CART,
        product
    }
}

export const removeFromCart = id => {
    return {
        type: REMOVE_FROM_CART,
        id
    }
}

export const addCategory = category =>{
    return {
        type: ADD_CATEGORY,
        category
    }
}

export const addAllProduct = product => {
    return{
        type: ADD_ALL_PRODUCT,
        product
    }
}

export const fetchAllOrders = orders => {
    return{
        type: FETCH_ALL_ORDERS,
        orders
    }
}

export const fetchSellerInfo = sellers =>{
    return{
        type: FETCH_SELLER_INFO,
        sellers
    }
}

export const setAllUser = users => {
    return{
        type: ADD_ALL_USERS,
        users
    }
}

export const setAllSupplier = suppliers => {
    return{
        type: ADD_ALL_SUPPLIER,
        suppliers
    }
}