import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export const QuickView = ({ image, hideModal }) => (
    <Modal className="modal-quick-view" isOpen={true}>
        <ModalHeader style={{ padding: 0 }} toggle={hideModal}>
        </ModalHeader>
        <ModalBody>
            <img src={image} alt="" />
        </ModalBody>
    </Modal>
);