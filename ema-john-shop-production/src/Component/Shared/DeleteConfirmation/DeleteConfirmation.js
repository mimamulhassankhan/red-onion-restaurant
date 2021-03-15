import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteSelectedData } from '../../../utils/dataControllers';

const DeleteConfirmation = ({url, show, handleClose, setDeleteState}) => {

    const handleDeleteClick = () => {
        deleteSelectedData(url)
        .then(returnedData => {
            if(returnedData){
                setDeleteState(true);
            }
        })
    }
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDeleteClick()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default DeleteConfirmation;