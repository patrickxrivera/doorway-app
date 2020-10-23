import React from 'react';
import Modal from "react-bootstrap/Modal";

function ModalComponent({ show, setShow, StepComponent, followedTwitterUsers }) {
    const handleClose = () => setShow(false);
    
    return (
        <Modal show={show} onHide={handleClose}>
            <StepComponent followedTwitterUsers={followedTwitterUsers} />
        </Modal>
    )
}

export default ModalComponent;