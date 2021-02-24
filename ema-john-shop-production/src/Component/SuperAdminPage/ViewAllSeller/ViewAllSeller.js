import { faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import DashboardNav from '../../Shared/DashboardNav/DashboardNav';

const ViewAllSeller = ({sellers}) => {
    return (
        <>
        <DashboardNav displayOption="All Seller"></DashboardNav>
        <Table className="text-center rounded m-2 bg-white p-3" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Seller Name</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            {
                sellers.length > 0 ?
                <tbody>
                    {
                        sellers.map((seller, idx) => 
                        <tr className="align-center">
                            <td>{idx+1}</td>
                            <td>{seller.sellerName}</td>
                            <td>{seller.sellerAddress}</td>
                            <td>
                                <Form.Control as="select" defaultValue={0}>
                                    <option value="Active">Active</option>
                                    <option value="Disabled">Disabled</option>
                                </Form.Control>
                            </td>
                            <td className="d-flex justify-content-around" >
                                <Button variant="success"><FontAwesomeIcon icon={faEye} /></Button>
                                <Button variant="info"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                <Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button>
                            </td>
                        </tr>)
                    }
                    
                </tbody>
                :
                <h1 className="text-center text-danger">Nothing to Show</h1>
            }
            
        </Table>  
        </>
    );
};

const mapStateToProps = state => {
    return{
        sellers: state.sellers
    }
}

export default connect(mapStateToProps)(ViewAllSeller);