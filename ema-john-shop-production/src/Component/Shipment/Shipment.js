import React from 'react';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addSignedUser, addToCart, fetchAllOrders } from '../../Redux/Actions/StoreActions';
import { processOrder } from '../../utilities/databaseManager';
import { updateJSONData } from '../../utils/dataControllers';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Shipment = ({user,cart, addToCart, orders, fetchAllOrders, addSignedUser, allSuppliers}) => {
    const { register, handleSubmit, errors } = useForm();
    const [shippingData, setShippingData] = useState(null);
    const history = useHistory();
    
    const onSubmit = data => {
        const newUserInfo = {
            district: data.district,
            roadNo: data.roadNo,
            flatNo: data.flatNo,
            businessName: data.businessName,
            userPhone: data.userPhone
        }
        updateJSONData(`http://localhost:5000/updateUser/${user?._id}`, newUserInfo)
        .then(data => {
            if(data){
                const updatedUser = {...user, userShippingAddress: newUserInfo};
                addSignedUser(updatedUser);
            }
        })
        .catch(err => console.log(err));
        setShippingData(newUserInfo);
    };

    const getProductId = () => {
        const cartProductIds = cart.map(item => {
            const productInfo = {
                productId: item._id,
                quantity: item.quantity,
                productSellerId : item.productSellerId,
                productSellerName: item.productSellerName || item.seller
            }
            return productInfo;
        });
        return cartProductIds;
    }

    const getSupplier = () => {
        const [activeSupplier] = allSuppliers.filter(supplier => supplier.supplierStatus === 'active');
        const optimizedSupplierInfo = {
            supplierName: activeSupplier.supplierName,
            supplierPhone: activeSupplier.supplierPhone
        }
        return optimizedSupplierInfo;
    }

    const handlePaymentSuccess = paymentId => {
        const orderDetails = { 
            ordererName: `${user.firstName} ${user.lastName}` || 'Unknown',
            ordererEmail: user.email || 'Unknown',
            shipping: shippingData,
            paymentId,
            orderedItems: getProductId(),
            supplierInfo: getSupplier(),
            status: 'pending',
            orderTime: new Date()
        };
        fetch('https://fathomless-basin-42766.herokuapp.com/addOrder', {
            method: 'POST',
            headers: { 'Content-type':'application/json'},
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                addToCart([]);
                fetchAllOrders([data, ...orders])
                history.push('/myAccount');
                processOrder();
            }
        })
    }
    return (
        <>
        {
            user.role === 'customer'?
            <>
                <Container>
                    <Row className="mt-5 align-items-center mx-auto">
                        <Col style={{display: shippingData ? 'none' : 'block'}}>
                            <form className="form-group" onSubmit={handleSubmit(onSubmit)} placeholder="Enter name">
                                <input style={{ width:'300px'}} className="form-control" name="name" defaultValue={`${user.firstName} ${user.lastName}`} ref={register({ required: true })} placeholder="Enter Name" readOnly/>
                                {errors.name && <span>Name is required</span>}

                                <br/>
                                <input style={{ width:'300px'}} className="form-control" name="email" defaultValue={user.email || ''} ref={register({ required: true })}  placeholder="Enter email" readOnly/>
                                {errors.email && <span className="text-danger">Email is required</span>}

                                <br/>
                                <input style={{ width:'300px'}} className="form-control" name="district" ref={register({ required: true })} defaultValue={user?.userShippingAddress?.district} placeholder="District"/>
                                {errors.district && <span className="text-danger">This field is required</span>}
                                <br/>

                                <input style={{ width:'300px'}} className="form-control" name="roadNo" ref={register({ required: true })} defaultValue={user?.userShippingAddress?.roadNo} placeholder="Road No"/>
                                {errors.roadNo && <span className="text-danger">Road No is required</span>}
                                
                                <br/>
                                <input style={{ width:'300px'}} className="form-control" name="flatNo" ref={register({ required: true })} defaultValue={user?.userShippingAddress?.flatNo} placeholder="Flat No"/>
                                {errors.flatNo && <span className="text-danger">Flat No is required</span>}

                                <br/>
                                <input style={{ width:'300px'}} className="form-control" name="businessName" ref={register()} defaultValue={user?.userShippingAddress?.businessName} placeholder="Business Name"/>

                                <br/>
                                <input style={{ width:'300px'}} className="form-control" name="userPhone" ref={register({ required: true })} defaultValue={user?.userShippingAddress?.userPhone} placeholder="Enter phone"/>
                                {errors.userPhone && <span className="text-danger">Phone is required</span>}
                                
                                <br/>
                                <input style={{ width:'300px'}} className="btn btn-danger btn-block rounded-pill" type="submit" />
                            </form>
                        </Col>
                        <Col className="text-center" style={{display: shippingData ? 'block' : 'none'}}>
                            <ProcessPayment handlePayment={handlePaymentSuccess}/>
                        </Col>
                    </Row>
                </Container>
            </>
            :
            <h1 className="text-center text-danger">This page is not accessible through this account. Try sign out</h1>
        }
        </>
        
       );
}

const mapStateToProps = state => {
    return{
        user: state.user,
        cart: state.cart,
        orders: state.orders,
        allSuppliers: state.allSuppliers,
    }
}

const mapDispatchToProps = {
    addToCart : addToCart,
    fetchAllOrders : fetchAllOrders,
    addSignedUser: addSignedUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Shipment);