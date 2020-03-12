import _ from 'lodash';
import md5 from 'md5';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from "react-router-dom";
import {
    Container, Row, Col,
    Form, Label,
    Input, Button
} from 'reactstrap';

import { postUser } from '../../api/users';
import * as types from '../../constants/index';


const SignUp = ({ users }) => {
    const history = useHistory();
    const [userInfo, setUserInfo] = useState({});
    const handleChange = event => {
        const { name, value } = event.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const { email, password, cfpassword } = userInfo;
    const userCurrent = _.find(users, user => user.email === email);
    const { email: userEmail } = userCurrent ? userCurrent : {};

    // validate signup
    const errors = {
        errEmail: null,
        errPassword: null,
        errCfPassword: null
    };

    if (email !== undefined || password !== undefined) {
        if (!email) {
            errors.errEmail = 'Email is required!';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            errors.errEmail = 'Invalid email address!';
        } else if (userEmail) {
            errors.errEmail = 'Email exists already!';
        } else {
            errors.errEmail = false;
        } if (!password) {
            errors.errPassword = 'Password is required!';
        } else if (password.length < 6) {
            errors.errPassword = 'Password need minimum is 6 character!';
        } else {
            errors.errPassword = false;
        } if (!cfpassword) {
            errors.errCfPassword = 'Your need confirm password!';
        } else if (cfpassword !== password) {
            errors.errCfPassword = 'Wrong password!';
        } else {
            errors.errCfPassword = false;
        }
    };


    const onSubmit = async event => {
        let { email, password } = userInfo;
        event.preventDefault();
        try {
            password = md5(password);
            const res = await postUser({ email, password });
            if (res.status === types.STATUS_CODE.CREATED) {
                history.push('/signin');
            };
        } catch (error) {
            console.log(error);
        };
    };

    const { errEmail, errPassword, errCfPassword } = errors;
    return (
        <Container className="container mt-5">
            <Row className="mt-5">
                <Col sm="5" className="mx-auto">
                    <Form className="form-auth">
                        <div className="form-group">
                            <Label htmlFor="email">Email address*</Label>
                            <Input
                                onChange={handleChange}
                                name="email"
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                autoComplete="off"
                            />
                            {email !== undefined && errEmail && <span className="text-danger">{errEmail}</span>}
                        </div>
                        <div className="form-group">
                            <Label htmlFor="password">Password*</Label>
                            <Input
                                onChange={handleChange}
                                name="password"
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                autoComplete="off"
                            />
                            {password !== undefined && errPassword && <span className="text-danger">{errPassword}</span>}
                        </div>
                        <div className="form-group">
                            <Label htmlFor="cfpassword">Confirm Password*</Label>
                            <Input
                                onChange={handleChange}
                                name="cfpassword"
                                type="password"
                                className="form-control"
                                id="cfpassword"
                                placeholder="Enter your password"
                                autoComplete="off"
                            />
                            {cfpassword !== undefined && errCfPassword && <span className="text-danger">{errCfPassword}</span>}
                        </div>
                        <Link to="/signin"><u className="form-text">I have already account!</u></Link>
                        <Button
                            onClick={onSubmit}
                            type="submit" color="primary" className="mt-2 d-block"
                            disabled={errEmail !== false || errPassword !== false || errCfPassword !== false}>Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

SignUp.propTypes = {
    users: PropTypes.array
};

export default SignUp;