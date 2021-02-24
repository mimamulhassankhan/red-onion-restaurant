import { faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import DashboardNav from '../../Shared/DashboardNav/DashboardNav';

const ViewAllProducts = ({user, products}) => {
    const [sellerProducts, setSellerProducts] = useState([]);
    useEffect(() =>{
        const sellerProd = products.filter(prod => (prod.seller || prod.productSellerName) === user.displayName);
        setSellerProducts(sellerProd);
    }, [user, products])
    return (
        <>
        <DashboardNav displayOption="View All Product"></DashboardNav>
        <Table className="text-center rounded m-2 bg-white" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Current Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    sellerProducts.map((prod, idx) => 
                    <tr key={prod._id} className="align-center">
                        <td>{idx+1}</td>
                        <td>{prod.key || prod._id}</td>
                        <td>{prod.name || prod.productName}</td>
                        <td>{prod.price || prod.productPrice}</td>
                        <td>{prod.stock || prod.productStock}</td>
                        <td className="d-flex justify-content-around" >
                            <Button variant="success"><FontAwesomeIcon icon={faEye} /></Button>
                            <Button variant="info"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                            <Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button>
                        </td>
                    </tr>)
                }
                
            </tbody>
        </Table>
        </>
    );
};

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(ViewAllProducts);