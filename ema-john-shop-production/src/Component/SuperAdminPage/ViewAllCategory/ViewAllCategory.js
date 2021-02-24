import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import AddCategory from '../AddCategory/AddCategory';
import {faPen, faTrashAlt, faEye} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import DashboardNav from '../../Shared/DashboardNav/DashboardNav';

const ViewAllCategory = ({categories}) => {
    return (
        <>
            <DashboardNav displayOption="Add/View Category"></DashboardNav>
            <AddCategory></AddCategory>
            <Table className="text-center rounded m-2 bg-white p-3" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map(cat => 
                        <tr key={cat._id} className="align-center">
                            <td>1</td>
                            <td>{cat.categoryName}</td>
                            <td>{cat.categoryDetails}</td>
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
        categories: state.categories
    }
}

export default connect(mapStateToProps)(ViewAllCategory);