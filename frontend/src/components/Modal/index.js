import React from 'react';
import Modal from "react-bootstrap/Modal";

function ModalComponent({ show, setShow, StepComponent, ...props }) {
    const handleClose = () => setShow(false);
    
    return (
        <Modal show={show} onHide={handleClose}>
            <StepComponent {...props} />
        </Modal>
    )
}

export default ModalComponent;