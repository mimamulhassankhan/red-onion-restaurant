import React from 'react';

const Cart = ({items, ...props}) => {
    console.log(items)
    const cart = items;
    let totalPrice = 0.00;
    
    totalPrice = cart.reduce((totalPrice, pdr) => totalPrice + pdr.price, 0);

    let shippingCost = 0;
    if(totalPrice >= 1 && totalPrice <= 50 ){
        shippingCost = 10.00;
    }
    else if(totalPrice >= 51 && totalPrice <= 200){
        shippingCost = 5.00;
    }
    else{
        shippingCost = 0.00;
    }
    return (
        <div style={{position: 'sticky', top: '0'}}>
            <h3>Order Summery</h3>
            <p>Items Ordered : {cart.length}</p>
            <p>Shipping: {shippingCost}</p>

            <h2 style={{color: 'red'}}>Total Price : {totalPrice + shippingCost}</h2>
            {
                props.children
            }
        </div>
    );
};

export default Cart;