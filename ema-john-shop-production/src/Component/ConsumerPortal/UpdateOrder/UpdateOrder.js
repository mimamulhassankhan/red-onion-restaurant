import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { fetchAllOrders } from '../../../Redux/Actions/StoreActions';
import { updateJSONData } from '../../../utils/dataControllers';

const UpdateOrder = ({show, handleClose, orderDetails, products, orders, fetchAllOrders}) => {
    const {orderedItems, orderTime} = orderDetails; 
    const [showProducts, setShowProducts] = useState(false);
    const { register, handleSubmit, errors, reset } = useForm();
    const handleOrderInfoUpdateClick = (data) => {
        updateJSONData(`http://localhost:5000/updateOrderInfo/${orderDetails?._id}`, data)
        .then(returnedData => {
            if(returnedData){
                const newOrderList = orders.filter(user => user._id !== orderDetails._id);
                const singleOrderInfo = {...orderDetails, status: data?.status};
                fetchAllOrders([...newOrderList, singleOrderInfo]);
                handleClose();
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <>
        <Modal size="md" show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit(handleOrderInfoUpdateClick)}>
            <Modal.Header closeButton>
                <Modal.Title>Order Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="pl-2 parcel-link-table">
                    <table className="mb-3">
                        <tbody>
                            <tr className="table-row-border">
                                <th>Date &amp; Time</th>
                                <td>{orderTime}</td>
                            </tr>
                            <tr className="table-row-border">
                                <th>Destination</th>
                                <td>
                                    {
                                        `Flat: ${orderDetails && orderDetails?.shipping?.flatNo}, Road: ${orderDetails && orderDetails?.shipping?.roadNo}, ${orderDetails && orderDetails?.shipping?.district}`
                                    }
                                </td>
                            </tr>
                            <tr className="table-row-border">
                                <th>Ordered Items</th>
                                <td>{orderedItems && orderedItems?.length} &nbsp;&nbsp;<button className="btn" onClick={() => setShowProducts(!showProducts)}><FontAwesomeIcon icon={faChevronDown} style={{fontSize: '12px'}} /></button> 
                                    <p className="p-2" style={{backgroundColor: '#f5f5f5', display: showProducts ? 'block' : 'none' }}>
                                        {
                                            orderedItems && orderedItems.map(item => {
                                                const [filteredProduct] = products.filter(pd => pd._id === item.productId);
                                                return (
                                                    <>
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h6>{filteredProduct.name || filteredProduct.productName}</h6>
                                                        </div>
                                                    </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </p>
                                </td>
                            </tr>
                            <tr className="table-row-border">
                                <th>ETA</th>
                                <td>To be confirmed</td>
                            </tr>
                            <tr className="table-row-border">
                                <th>Order Status</th>
                                <td>
                                    <select name="status" ref={register({ required: true })}>
                                        <option value="cancel">Cancel</option>
                                    </select>
                                    {errors.status && <span className="text-danger">This field is required</span>}
                                </td>
                            </tr>
                            <tr className="table-row-border">
                                <th>Status</th>
                                <td className="text-danger">Payment Pending</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Close
                </Button>
                <input type="submit" className="btn btn-primary rounded" />
            </Modal.Footer>
        </form>
        </Modal>
        </>
    );
};

const mapStateToProps = state => {
    return{
        orders: state.orders,
        products: state.products
    }
}

const mapDispatchToProps = {
    fetchAllOrders : fetchAllOrders
} 


export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrder);