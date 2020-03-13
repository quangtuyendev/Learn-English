import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export const RemoveModal = ({ hideModal, handleDelete, name, id, modalTitle }) => {
    const onKeyUp = event => {
        if (event.keyCode === 13) {
            handleDelete(id);
        };
    };
    return (
        <Modal
            onKeyUp={onKeyUp}
            tabIndex="0"
            isOpen={true}
            style={{outline: 'none'}}
            toggle={hideModal}>
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
