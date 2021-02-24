import React from 'react';
import { Button, Image } from 'react-bootstrap';

const ReviewItems = ({product, clickHandler}) => {
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
                        <Button onClick={() => clickHandler(product._id)} variant="danger">Delete</Button>
                    </div>
                </td>
                <td className="align-middle">{product.quantity}</td>
                <td className="align-middle">{(product.price || product.productPrice)* product.quantity}</td>
            </tr>
        </>
    );
};

export default ReviewItems;
