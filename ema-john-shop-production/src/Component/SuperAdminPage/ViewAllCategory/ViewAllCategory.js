import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import AddCategory from '../AddCategory/AddCategory';
import {faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import DashboardNav from '../../Shared/DashboardNav/DashboardNav';
import { deleteSelectedData } from '../../../utils/dataControllers';
import { addCategory } from '../../../Redux/Actions/StoreActions';

const ViewAllCategory = ({categories, addCategory}) => {
    const handleDeleteClick = catId => {
        deleteSelectedData(`http://localhost:5000/deleteCat/${catId}`)
        .then(data => {
            if(data){
                const filteredCat = categories.filter(cat => cat._id !== catId);
                addCategory(filteredCat);
            }
        })
        .catch(err => console.log(err));
    }
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
                        categories.map((cat, idx) => 
                        <tr key={cat._id} className="align-center">
                            <td>{idx+1}</td>
                            <td>{cat.categoryName}</td>
                            <td>{cat.categoryDetails}</td>
                            <td className="d-flex justify-content-around" >
                                <Button variant="danger" onClick={() => handleDeleteClick(cat._id)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
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

const mapDispatchToProps = {
    addCategory : addCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllCategory);