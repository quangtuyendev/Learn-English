import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';

QuickView.propTypes = {
  image: PropTypes.string,
  handleHideModal: PropTypes.func.isRequired,
};

QuickView.defaultProps = {
  image: '',
};

export default function QuickView({ image, handleHideModal }) {
  return (
    <Modal className="modal-quick-view" isOpen toggle={handleHideModal}>
      <ModalHeader style={{ padding: 0 }} toggle={handleHideModal} />
      <ModalBody>
        <img src={image} alt="" />
      </ModalBody>
    </Modal>
  );
}
