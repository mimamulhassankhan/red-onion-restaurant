import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Badge, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import DashboardNav from '../../Shared/DashboardNav/DashboardNav';

const ViewAllOrder = ({orders}) => {
    return (
        <>
            <DashboardNav displayOption="View All Order"></DashboardNav>
           <Table className="text-center rounded m-2 bg-white p-3" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Order No</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th>Transaction</th>
                    <th>Supplier Info</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.length > 0 ?
                    orders.map((order, idx) => 
                        <tr key={order._id} className="align-center">
                            <td>{idx+1}</td>
                            <td>{order._id}</td>
                            <td>{order.ordererName}</td>
                            <td>{order.shipping?.userPhone}</td>
                            <td>{`${order.shipping?.district}, ${order.shipping?.roadNo}, ${order.shipping?.flatNo}`}</td>
                            <td>{order?.paymentId}</td>
                            <td>
                                <p>{order?.supplierInfo?.supplierName}</p>
                                <p>{order?.supplierInfo?.supplierPhone}</p>
                            </td>
                            <td>
                                <Badge pill variant="primary">
                                    {order.status || 'Pending'}
                                </Badge>
                            </td>
                            <td className="d-flex justify-content-around" >
                                <Button variant="success"><FontAwesomeIcon icon={faEye} /></Button>
                            </td>
                            
                        </tr>)
                        :
                        <h6 className="text-center text-danger my-3">Sorry Nothing to show</h6>
                }
            </tbody>
        </Table> 
        </>
    );
};

const mapStateToProps = state => {
    return{
        orders: state.orders
    }
}

export default connect(mapStateToProps)(ViewAllOrder);