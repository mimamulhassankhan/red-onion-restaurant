import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../../Redux/Actions/StoreActions';
import './SingleProductCard.css';

const SingleProductCard = ({cart, addToCart, product}) => {

    const handleAddProductToCart = (product) => {
        product.quantity = 1;
        addToCart(product);
    }
    return (
        <>
        <Card className="product-card m-3 rounded text-center">
            <Card.Body as={Link} to={`/product/${product._id}`} className="text-decoration-none">
                <Card.Img className="card-image" variant="top" src={product.img || product.productImage} />
                <h6>{product.name || product.productName}</h6>
                <Card.Text>
                    {/* <ul>
                        {
                            features && features.map(ft => <li>{ft.description} : {ft.value}</li>)
                        }
                    </ul> */}
                </Card.Text>
                <h4 className="text-danger">$ {product.price || product.productPrice}</h4>
            </Card.Body>
            <Card.Text className="float-right">{product.seller || product.productSellerName}</Card.Text>
            <Button onClick={() => handleAddProductToCart(product)} className="my-2 mx-3" variant="primary">Add to cart</Button>
        </Card>
        </>
    );
};

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = {
    addToCart: addToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductCard);