import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart,setCart] = useState([]);

    useEffect( () => {
        fetch('https://fathomless-basin-42766.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, [])

    useEffect( () => {
        const storedProducts = getDatabaseCart();
        const productKeys = Object.keys(storedProducts);
        
        fetch('https://fathomless-basin-42766.herokuapp.com/selectedProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data));
    },[])

    const addProductToCart = (product) =>{
        let productCount = 1;
        let newCart;
        const sameProduct = cart.find(pd => pd.key === product.key);
        if(sameProduct){
            productCount = sameProduct.quantity + 1;
            sameProduct.quantity = productCount;
            const otherProducts = cart.filter(pd => pd.key !== product.key);
            newCart = [...otherProducts, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart , product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, productCount);
    }
    
    return (
        <div className="d-flex" style={{borderBottom: '1px solid #000', backgroundColor: 'lightgray'}}>
            <div className="w-75 p-3 ml-5">
                {
                    products.map(oneProduct => <Product showAddToCart={true} clickHandler={addProductToCart} product={oneProduct} key={oneProduct._id}></Product>)
                }
            </div> 
        </div>
    );
};

export default Shop;