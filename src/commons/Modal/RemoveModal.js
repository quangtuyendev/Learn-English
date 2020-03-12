import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export const RemoveModal = ({ hideModal, handleDelete, name, id, modalTitle }) => {
    return (
        <Modal isOpen={true} toggle={hideModal}>
            <ModalHeader style={{ padding: '1.4rem 2rem' }} toggle={hideModal}>
                {modalTitle}
            </ModalHeader>
            <ModalBody>
                <p className="modal-content modal-content-body">
                    Are you sure remove:
                    <b> {name}?</b>
                </p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => handleDelete(id)}>Ok</Button>{' '}
                <Button color="secondary" onClick={hideModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};
