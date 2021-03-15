import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { setAllUser } from '../../../Redux/Actions/StoreActions';
import { updateJSONData } from '../../../utils/dataControllers';

const UpdateSellerInfo = ({show, handleClose, sellerDetails, allUsers, setAllUser}) => {
    const {register, handleSubmit, errors} = useForm();

    const handleSellerInfoUpdate = data => {
        updateJSONData(`http://localhost:5000/updateSellerInfo/${sellerDetails?._id}`, data)
        .then(returnedData => {
            if(returnedData){
                const newSellerList = allUsers.filter(user => user._id !== sellerDetails._id);
                const singleSellerInfo = {...sellerDetails, sellerName: data?.sellerName, sellerAddress: data?.sellerAddress};
                setAllUser([...newSellerList, singleSellerInfo]);
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
            <form onSubmit={handleSubmit(handleSellerInfoUpdate)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Seller Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <input type="text" ref={register({ required: true })} name="sellerName" placeholder="Seller Name" className="form-control" defaultValue={sellerDetails?.sellerName}/>
                        {errors.sellerName && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <textarea rows={3} ref={register({ required: true })} name="sellerAddress" placeholder="Seller Address" className="form-control" defaultValue={sellerDetails?.sellerAddress}/>
                        {errors.sellerAddress && <span className="text-danger">This field is required</span>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
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
        allUsers: state.allUsers
    }
}

const mapDispatchToProps = {
    setAllUser : setAllUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSellerInfo);