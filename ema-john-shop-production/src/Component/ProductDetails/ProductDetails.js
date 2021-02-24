import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productkey} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch('https://fathomless-basin-42766.herokuapp.com/product/'+productkey)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productkey])

    return (
        <>
            <Product product={product}></Product>
        </>
    );
};

export default ProductDetails;