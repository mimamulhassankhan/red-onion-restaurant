import { faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAllUser } from '../../../Redux/Actions/StoreActions';
import { deleteSelectedData } from '../../../utils/dataControllers';
import DashboardNav from '../../Shared/DashboardNav/DashboardNav';
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation';
import UpdateSellerInfo from '../UpdateSellerInfo/UpdateSellerInfo';

const ViewAllSeller = ({allUsers, setAllUser}) => {
    const [allSellers, setAllSellers] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState({});
    const [deleteURL, setDeleteURL] = useState('');
    const [deleteState, setDeleteState] = useState(false);

    const handleUpdateClose = () => setModalShow(false);
    const handleUpdateShow = () => setModalShow(true);

    const handleDeleteClose = () => setDeleteModalShow(false);
    const handleDeleteShow = () => setDeleteModalShow(true);

    useEffect(() => {
        const filteredSellers = allUsers.filter(user => user.role === 'seller');
        setAllSellers(filteredSellers);
    }, [allUsers]);

    const handleSellerInfoClick = sellerId => {
        const [filteredSeller] = allUsers.filter(user => user.role === 'seller' && user._id === sellerId);
        setSelectedSeller(filteredSeller);
        handleUpdateShow();
    }

    const handleDeleteButtonClick = (sellerId) => {
        deleteSelectedData(`http://localhost:5000/deleteSeller/${sellerId}`)
        .then(data => {
            if(data){
                const remainingUsers = allUsers.filter(user => user._id !== sellerId);
                setAllUser(remainingUsers);
            }
        })
        .catch(err => console.log(err));
    }

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
                allSellers.length > 0 ?
                <tbody>
                    {
                        allSellers.map((seller, idx) => 
                        <tr key={idx} className="align-center">
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
                                <Button variant="danger" onClick={ () => handleDeleteButtonClick(seller._id)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                <Button variant="warning" onClick={() => handleSellerInfoClick(seller._id)}><FontAwesomeIcon icon={faPen} /></Button>
                            </td>
                        </tr>)
                    }
                    
                </tbody>
                :
                <tbody>
                    <tr>
                        <td colSpan="5">
                            <h1 className="text-center text-danger">Nothing to Show</h1>
                        </td>
                    </tr>
                </tbody>
            }
        </Table>
        <DeleteConfirmation setDeleteState={setDeleteState} url={deleteURL} show={deleteModalShow} handleClose={handleDeleteClose}></DeleteConfirmation>
        <UpdateSellerInfo sellerDetails={selectedSeller} show={modalShow} handleClose={handleUpdateClose}></UpdateSellerInfo>
        </>
    );
};

const mapStateToProps = state => {
    return{
        allUsers: state.allUsers
    }
}

const mapDispatchToProps = {
    setAllUser : setAllUser
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllSeller);