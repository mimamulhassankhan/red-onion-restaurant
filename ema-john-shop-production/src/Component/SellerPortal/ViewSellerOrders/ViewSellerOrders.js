import { faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import DashboardNav from '../../Shared/DashboardNav/DashboardNav';

const ViewSellerOrders = ({orders, user}) => {
    const [myOrders, setMyOrders] = useState([]);
    useEffect(() => {
        // const myProducts = [];
        // for(const obj in orders){
        //     console.log(...obj);
        //     myProducts.push(...obj?.orderedItems instanceof Array ?.filter(item => item.productSellerId === user._id));
        // // }
        // console.log(myProducts);
        // const filteredItems = orders.map(order => {
        //     let {orderedItems} = order;
        //     if(Array.isArray(orderedItems)){
        //         let myProducts = orderedItems.filter(item => item.productSellerId === user._id);
        //         return {...order, orderedItems: myProducts};
        //     }
        // })
        // console.log(filteredItems);
    },[orders, user])
    return (
        <>
            <DashboardNav displayOption="View Orders"></DashboardNav>
            <Table className="text-center rounded m-2 bg-white p-3" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Order No</th>
                    <th>Products</th>
                    <th>From</th>
                    <th>Shipping Address</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr className="align-center">
                    <td>1</td>
                    <td>pt.appointmentDate</td>
                    <td>pt.docId</td>
                    <td>pt.docId</td>
                    <td>pt.docId</td>
                    <td>pt.docId</td>
                    <td>
                        <Form.Control as="select" defaultValue={0}>
                            <option value="Accept">Accept</option>
                            <option value="pending">Pending</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Rejected">Rejected</option>
                        </Form.Control>
                    </td>
                    <td className="d-flex justify-content-around" >
                        <Button variant="success"><FontAwesomeIcon icon={faEye} /></Button>
                        <Button variant="info"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                        <Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button>
                    </td>
                    
                </tr>
            </tbody>
        </Table>
        </>
    );
};

const mapStateToProps = state => {
    return{
        orders: state.orders,
        user: state.user
    }
}

export default connect(mapStateToProps)(ViewSellerOrders);