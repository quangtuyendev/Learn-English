import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, Row, ModalHeader } from 'reactstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { css } from 'glamor';

const SaveForm = ({
    handleSave,
    hideModal,
    modalTitle,
    valueEdit,
    saveItem,
    editItem,
    showLoading,
    hideLoading,
}) => {
    const [state, setState] = useState(valueEdit);

    const { name } = state;

    const date = new Date();
    const onChange = event => {
        const { value } = event.target;
        setState({
            ...state,
            name: value,
            date: date.getTime()
        });
    };

    const onKeyUp = event => {
        const { id } = state;
        const { keyCode } = event;
        if (keyCode === 13) {
            if (!id) {
                saveItem(state, () => {
                    hideModal();
                    showLoading();
                    setTimeout(() => {
                        hideLoading();
                    }, 1000);
                    toast.success("App Success !", {
                        position: toast.POSITION.BOTTOM_LEFT,
                        autoClose: 2000,
                        bodyClassName: css({
                            fontSize: '1.6rem'
                        }),
                    });
                });
            } else {
                editItem(id, state, () => {
                    hideModal();
                    showLoading();
                    setTimeout(() => {
                        hideLoading();
                    }, 1000);
                    toast.success("Edit Success !", {
                        position: toast.POSITION.BOTTOM_LEFT,
                        autoClose: 2000,
                        bodyClassName: css({
                            fontSize: '1.6rem'
                        }),
                        className: css({
                            background: 'gold'
                        }),
                    });
                });
            };
        };
    };

    return (
        <Container>
            <Row>
                <Col sm="4">
                    <Modal className="modal-save" isOpen={true}>
                        <ModalHeader toggle={hideModal}>
                            <p>{modalTitle}</p>
                        </ModalHeader>
                        <Form method="dialog" className="form-save">
                            <FormGroup>
                                <Label for="name">Your word*</Label>
                                <Input
                                    onChange={onChange}
                                    onKeyUp={onKeyUp}
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter your word"
                                    autoComplete="off"
                                    value={name}
                                />
                            </FormGroup>
                            <Button onClick={() => handleSave(state)} color="primary">Save</Button>
                        </Form>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = state => ({
    valueEdit: state.valueEdit
});

SaveForm.propTypes = {
    handleSave: PropTypes.func,
    hideModal: PropTypes.func,
    modalTitle: PropTypes.string,
    valueEdit: PropTypes.object,
    saveItem: PropTypes.func,
    editItem: PropTypes.func,
    showLoading: PropTypes.func,
    hideLoading: PropTypes.func
};

export default connect(mapStateToProps)(SaveForm);