import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import DashboardNav from '../../Shared/DashboardNav/DashboardNav';

const ViewConsumerOrder = ({orders, user}) => {
    const [myOrders, setMyOrders] = useState([]);

    useEffect( () => {
        const myOrdersFromAllOrder = orders.filter(order => order.ordererEmail === user.email);
        setMyOrders(myOrdersFromAllOrder);
    },[orders, user])
    return (
        <>
            <DashboardNav displayOption="My Orders"></DashboardNav>
            <Table className="text-center rounded m-2 bg-white p-3" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Order No</th>
                    <th>Items</th>
                    <th>Delivary Details</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    myOrders.length > 0 ?
                    myOrders.map((order, idx) => {
                        const {orderedItems, supplierInfo} = order;
                        return(
                            <tr key={order._id} className="align-center">
                                <td>{idx+1}</td>
                                <td>{order._id}</td>
                                <td>
                                    <tr>
                                        {
                                            orderedItems.map(item => (
                                                <>
                                                <td>{item?.productId}</td>
                                                <td>{item?.quantity}</td>
                                                <br/>
                                                </>
                                            ))
                                        }
                                    </tr>
                                </td>
                                <td>
                                    <p>{supplierInfo?.supplierName}</p>
                                    <p>{supplierInfo?.supplierPhone}</p>
                                </td>
                                <td>
                                    <Badge pill variant="primary">
                                        {order.status || 'Pending'}
                                    </Badge>
                                </td>
                                <td className="d-flex justify-content-around" >
                                    <Button variant="success"><FontAwesomeIcon icon={faEye} /></Button>
                                </td>
                            </tr>
                        )
                    }
                    )
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
        user: state.user,
        orders: state.orders
    }
}
export default connect(mapStateToProps)(ViewConsumerOrder);