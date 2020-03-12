import _ from 'lodash';
import md5 from 'md5';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap';
import * as actions from '../../actions/index';


const SignIn = ({ users, signin }) => {

    const history = useHistory();
    const [userInfo, setUserInfo] = useState({});
    const handleChange = event => {
        const { name, value } = event.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const { email, password } = userInfo;
    let error = {
        errEmail: null,
        errPassword: null
    };

    // validate signin
    const userCurrent = _.find(users, user => user.email === email);
    const { email: userEmail, password: userPassword } = userCurrent ? userCurrent : {};
    if (email !== undefined || password !== undefined) {
        if (!email) {
            error.errEmail = 'Email is requied!';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            error.errEmail = 'Email address invalid!';
        } else if (!userEmail) {
            error.errEmail = 'Email does not exist!';
        } else {
            error.errEmail = false;
        }
        if (!password) {
            error.errPassword = 'Password is required!';
        } else if (password.length < 6) {
            error.errPassword = 'Password need minimum is 6 character!';
        } else if (md5(password) !== userPassword) {
            error.errPassword = 'Wrong password!';
        } else {
            error.errPassword = false;
        };
    };

    const { errEmail, errPassword } = error;
    const onSubmit = event => {
        event.preventDefault();
        if (errEmail === false && errPassword === false) {
            signin({ email, isAuthenticated: true }, () => {
                history.push('/');
            });
        };
    };

    return (
        <Container className="container mt-5">
            <Row className="row mt-5">
                <Col className="col-sm-5 mx-auto">
                    <Form onSubmit={onSubmit} className="form-auth">
                        <div className="form-group">
                            <Label htmlFor="email">Your mail*</Label>
                            <Input
                                onChange={handleChange}
                                name="email" type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your mail"
                                autoComplete="off"
                            />
                            {email !== undefined && errEmail && <span className="text-danger">{errEmail}</span>}
                        </div>
                        <div className="form-group">
                            <Label htmlFor="password">Your password*</Label>
                            <Input
                                onChange={handleChange}
                                name="password" type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                autoComplete="off"
                            />
                            {password !== undefined && errPassword && <span className="text-danger">{errPassword}</span>}
                        </div>
                        <Link to="/signup"><u className="form-text">Register account here!</u></Link>
                        <Button type="submit" color="primary" className="d-block" disabled={errEmail !== false || errPassword !== false}>Signin</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

SignIn.propTypes = {
    users: PropTypes.array,
    signin: PropTypes.func
};

export default connect(null, actions)(SignIn);