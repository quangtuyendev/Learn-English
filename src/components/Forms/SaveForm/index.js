import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import {
  Button,
  Col,
  Container,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  Row,
} from 'reactstrap';
import * as Yup from 'yup';
import { EditItemContext } from '../../../contexts/editItem';

SaveForm.propTypes = {
  handleSaveItem: PropTypes.func.isRequired,
  handleHideModal: PropTypes.func.isRequired,
  modalTitle: PropTypes.string,
};

SaveForm.defaultProps = {
  modalTitle: '',
};

export default function SaveForm({
  handleSaveItem,
  handleHideModal,
  modalTitle,
}) {
  const [{ name, image, id }] = useContext(EditItemContext);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    image: Yup.string()
      .required('Image is required')
      .url('Image need be a URL'),
  });

  const handleSubmit = (value) => {
    handleSaveItem({ ...value, date: Date.now(), id });
  };

  return (
    <Container>
      <Row>
        <Col sm="4">
          <Modal
            tabIndex={0}
            className="modal-save"
            isOpen
            style={{ outline: 'none' }}
            toggle={handleHideModal}
          >
            <ModalHeader toggle={handleHideModal}>
              <p>{modalTitle}</p>
            </ModalHeader>
            <Formik
              initialValues={{
                name,
                image,
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ errors, touched, isValid }) => (
                <Form className="form-save">
                  <FormGroup>
                    <Label for="name">Your word*</Label>
                    <Field name="name">
                      {({ field }) => (
                        <input
                          id="name"
                          type="text"
                          className="form-control"
                          placeholder="Enter your word"
                          {...field}
                        />
                      )}
                    </Field>
                    {touched.name && errors.name && (
                      <span
                        style={{
                          fontSize: '1.4rem',
                          marginTop: '0.8rem',
                          display: 'block',
                        }}
                        className="text-danger"
                      >
                        {errors.name}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="image" className="mt-4">
                      Your image*
                    </Label>
                    <Field name="image">
                      {({ field }) => (
                        <input
                          id="image"
                          type="text"
                          className="form-control"
                          placeholder="Enter your image link"
                          {...field}
                        />
                      )}
                    </Field>
                    {touched.image && errors.image && (
                      <span
                        style={{
                          fontSize: '1.4rem',
                          marginTop: '0.8rem',
                          display: 'block',
                        }}
                        className="text-danger"
                      >
                        {errors.image}
                      </span>
                    )}
                  </FormGroup>
                  <Button type="submit" color="primary" disabled={!isValid}>
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}
