import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';

RemoveModal.propTypes = {
  handleHideModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  name: PropTypes.string,
  id: PropTypes.string,
  modalTitle: PropTypes.string,
};

RemoveModal.defaultProps = {
  name: '',
  id: '',
  modalTitle: '',
};

export default function RemoveModal({
  handleHideModal,
  handleDelete,
  name,
  id,
  modalTitle,
}) {
  return (
    <Modal
      tabIndex="0"
      isOpen
      style={{ outline: 'none' }}
      toggle={handleHideModal}
    >
      <ModalHeader style={{ padding: '1.4rem 2rem' }} toggle={handleHideModal}>
        {modalTitle}
      </ModalHeader>
      <ModalBody>
        <p className="modal-content modal-content-body">
          Are you sure remove:
          <b> {name}?</b>
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => handleDelete(id)}>
          Ok
        </Button>
        <Button color="secondary" onClick={handleHideModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
