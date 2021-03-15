import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addAllProduct } from '../../../Redux/Actions/StoreActions';
import { deleteSelectedData } from '../../../utils/dataControllers';
import DashboardNav from '../../Shared/DashboardNav/DashboardNav';

const ViewAllProducts = ({user, products, addAllProduct}) => {
    const [sellerProducts, setSellerProducts] = useState([]);
    useEffect(() =>{
        const sellerProd = products.filter(prod => (prod.seller || prod.productSellerName) === user?.sellerName);
        setSellerProducts(sellerProd);
    }, [user, products]);

    const handleDeleteButtonClick = (productId) => {
        deleteSelectedData(`http://localhost:5000/deleteProduct/${productId}`)
        .then(data => {
            if(data){
                const filteredData = products.filter(pd => pd._id !== productId);
                addAllProduct(filteredData);
            }
        })
        .catch(err => console.log(err));
        
    }
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
                            <Button variant="danger" onClick={() => handleDeleteButtonClick(prod._id || prod.key)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
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

const mapDispatchToProps = {
    addAllProduct : addAllProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllProducts);