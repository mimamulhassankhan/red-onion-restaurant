import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMinus, faPlus, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Button, Col, Row } from 'react-bootstrap';
import { addToCart } from '../../Redux/Actions/StoreActions';
import { connect } from 'react-redux';

const Product = ({addToCart, product, ...props}) => {
    const [productQuantity, setProductQuantity] = useState(1);

    const handleMinus = () => {
        if(productQuantity>1){
            setProductQuantity(productQuantity-1);
        }
    }
    const handleAddToCart = product => {
        product.quantity = productQuantity;
        addToCart(product);
    }
    return (
         <Row>
            <Col>
                <div className="mt-2 text-center">
                    <img width={400} src={product.img || product.productImage} alt="food"/>
                </div>
            </Col>
            <Col className="d-flex  align-content-center flex-wrap">
                <h2 variant="xxLarge">{product.name || product.productName}</h2>
                <p className="text-muted mt-3">{}</p>
                <Row style={{width: '100%'}}  className="d-flex">
                    <Col md={3} >
                        <h3 variant="xxLarge">$ {product.price || product.productPrice}</h3>
                    </Col>
                    <Col md={3} className="d-flex align-content-right justify-content-around border rounded-pill">
                        <FontAwesomeIcon style={{marginTop : '10px'}} onClick={handleMinus} icon={faMinus} />
                        <h4 variant="xxLarge">{productQuantity}</h4>
                        <FontAwesomeIcon style={{marginTop : '10px'}} onClick={()=>setProductQuantity(productQuantity+1)} icon={faPlus} className="text-danger" />
                    </Col>
                </Row>
                <br/>
                
                <Row>
                    <Button onClick={() => handleAddToCart(product)} className="rounded-pill mt-3 mb-3" variant="danger"><FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</Button>
                </Row>
            </Col>
        </Row>
        // <div className="singleProduct">
        //     <div className="imagePart">
        //         <img className="rounded float-left" src={img} alt="product-img"/>
        //     </div>
        //     <div className="descriptionPart">
        //         <h3 className="productName"><Link to={"/product/"+key}>{name}</Link></h3>
        //         <br/>
        //         <p><small>by : {seller}</small></p>
        //         <p>${price}</p>
        //         <p>only {stock} lrft in the stock. Order soon</p>
        //         {props.showAddToCart && <button onClick={() => props.clickHandler(props.product)} className="btn btn-success"> <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> add to cart</button>}
        //     </div>
        // </div>
    );
};

const mapStateToProps = state => {
    return{
        cart: state.cart
    }
}

const mapDispatchToProps = {
    addToCart : addToCart
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);