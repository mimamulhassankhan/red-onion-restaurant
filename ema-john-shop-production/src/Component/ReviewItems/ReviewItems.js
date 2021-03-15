import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../Redux/Actions/StoreActions';

const ReviewItems = ({product, removeFromCart, addToCart}) => {
    
    return (
        <>          
        <tr>
            <td className="align-middle">{product._id}</td>
            <td className="d-flex align-middle">
                <div>
                    <Image height={100} src={product.img || product.productImage} alt="pdr" rounded />
                </div>
                <div className="ml-2">
                    <h5>{product.name || product.productName}</h5>
                    <div className="d-flex justify-content-between">
                        <div>
                            <p>Category : {product.category || product.productCategory}</p>
                            <p className="text-warning">Price : {product.price || product.productPrice}</p>
                        </div>
                        <div>
                            <p className="text-info">Seller : {product.seller || product.productSellerName ||  'Coming soon'}</p>
                            <p><small>Shipping : {product.shipping || 'Coming soon'}</small></p>
                        </div>
                    </div>
                </div>
            </td>
            <td className="align-middle">
                <div className="d-flex align-items-center">
                    <Button onClick={() => removeFromCart(product._id)} variant="danger">Delete</Button>
                </div>
            </td>
            <td className="align-middle">
                <div className="d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon onClick={() => addToCart({...product, quantity: -1})} icon={faMinus} />
                    <h4>{product.quantity}</h4>
                    <FontAwesomeIcon onClick={() => addToCart({...product, quantity: 1})} icon={faPlus} className="text-danger" />
                </div>
            </td>
            <td className="align-middle">{+((product.price || product.productPrice)* product.quantity).toFixed(2)}</td>
        </tr>
        </>
    );
};

const mapStateToProps = state => {
    return{
        cart : state.cart
    }
}

const mapDispatchToProps = {
    removeFromCart : removeFromCart,
    addToCart : addToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewItems);
