import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Button, Col,
    Container, Form, FormGroup,
    Input, Label, Modal,
    ModalHeader, Row
} from 'reactstrap';

const SaveForm = ({
    handleSave,
    hideModal,
    modalTitle,
    valueEdit
}) => {
    const [state, setState] = useState(valueEdit);
    const { name, image } = state;
    const date = new Date();
    const onChange = event => {
        const { value, name } = event.target;
        setState({
            ...state,
            [name]: value,
            date: date.getTime()
        });
    };

    // validate form
    const error = {};
    if (name !== undefined || image !== undefined) {
        if (!name) {
            error.errName = 'This field is required!';
        } else {
            error.errName = false;
        }
        if (!image) {
            error.errImage = 'Image is required!';
        } else {
            error.errImage = false;
        };
    };

    const { errName, errImage } = error;

    // handle trigger enter
    const onKeyUp = event => {
        if (errName === false && errImage === false) {
            if (event.keyCode === 13) {
                handleSave(state);
            };
        };
    };

    return (
        <Container>
            <Row>
                <Col sm="4">
                    <Modal
                        onKeyUp={onKeyUp}
                        tabIndex={0}
                        className="modal-save"
                        isOpen={true}
                        autoFocus={false}
                        style={{outline: 'none'}}
                    >
                        <ModalHeader toggle={hideModal}>
                            <p>{modalTitle}</p>
                        </ModalHeader>
                        <Form method="dialog" className="form-save">
                            <FormGroup>
                                <Label for="name">Your word*</Label>
                                <Input
                                    onChange={onChange}
                                    name="name"
                                    id="name"
                                    type="text"
                                    value={name}
                                    autoFocus={true}
                                    placeholder="Enter your word"
                                    autoComplete="off"
                                />
                                {name === '' && (<span style={{fontSize: "1.4rem", marginTop: "0.8rem", display: "block"}} className="text-danger">{errName}</span>)}
                            </FormGroup>
                            <FormGroup>
                                <Label for="image" className="mt-4">Your image*</Label>
                                <Input
                                    onChange={onChange}
                                    name="image"
                                    id="image"
                                    type="text"
                                    value={image}
                                    placeholder="Enter your image link"
                                    autoComplete="off"
                                />
                                {image === '' && <span style={{fontSize: "1.4rem", marginTop: "0.8rem", display: "block"}} className="text-danger">{errImage}</span>}
                            </FormGroup>
                            <Button
                                onClick={() => handleSave(state)}
                                color="primary"
                                disabled={errName !== false || errImage !== false}
                            >Save</Button>
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