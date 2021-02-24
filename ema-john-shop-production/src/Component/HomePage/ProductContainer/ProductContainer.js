import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import SingleProductCard from '../SingleProductCard/SingleProductCard';

const ProductContainer = ({selectedCategory, products}) => {
    const [categoryWiseProduct, setCategoryWiseProduct] = useState([]);

    useEffect(() =>{
        if(selectedCategory !== 'trending-items'){
            const filteredProducts = products.filter(data => data.category === selectedCategory.toLowerCase());
            console.log(filteredProducts);
            setCategoryWiseProduct(filteredProducts.slice(0, 15));
        }
        else{
            setCategoryWiseProduct(products.slice(0, 15));
        }
        
    },[selectedCategory, products]);
    return (
        <>
        <Container className="d-flex flex-wrap justify-content-around mt-3 mb-3">
            {
                categoryWiseProduct.map(prod => <SingleProductCard product={prod} key={prod._id}></SingleProductCard>)
            }
        </Container>
        </>
    );
};

const mapStateToProps = state => {
    return{
        products: state.products
    }
}


export default connect(mapStateToProps) (ProductContainer);