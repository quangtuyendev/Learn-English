import { Field, Form, Formik } from 'formik';
import _ from 'lodash';
import md5 from 'md5';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Col, Container, Label, Row } from 'reactstrap';
import { signUp } from '../../actions';
import * as types from '../../actions/types';
import { postUser } from '../../api/users';
import { UserContext } from '../../contexts/user';
import * as utils from '../../utils';

export default function SignUp() {
  const [showPasswordField, setShowPasswordField] = useState([]);

  const history = useHistory();
  const [users, dispatch] = useContext(UserContext);

  // validate signup
  const validation = ({ email, password, cfpassword }) => {
    const errors = {};
    const userCurrent = utils.findUser(users, email);
    const { email: userEmail } = userCurrent;

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email address';
    } else if (userEmail) {
      errors.email = 'Email exists already';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password need minimum is 6 character!';
    }
    if (!cfpassword) {
      errors.cfpassword = 'Your need confirm password!';
    } else if (!errors.password && cfpassword !== password) {
      errors.cfpassword = 'Wrong password!';
    }
    return errors;
  };

  const handleSubmit = async ({ email, password }) => {
    try {
      const { data, status } = await postUser({
        email,
        password: md5(password),
      });
      if (status === types.STATUS_CODE.CREATED) {
        dispatch(signUp(data));
        history.push('/signin');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTogglePassword = (inputName) => {
    let values = [...showPasswordField];
    if (values.includes(inputName)) {
      setShowPasswordField([..._.filter(values, (item) => item !== inputName)]);
    } else {
      setShowPasswordField([...values, inputName]);
    }
  };

  return (
    <Container className="container mt-5">
      <Row className="mt-5">
        <Col sm="5" className="mx-auto">
          <Formik
            initialValues={{
              email: '',
              password: '',
              cfpassword: '',
            }}
            onSubmit={handleSubmit}
            validate={validation}
          >
            {({ touched, errors, isValid }) => (
              <Form className="form-auth" autoComplete="off">
                <div className="form-group">
                  <Label htmlFor="email">Your email*</Label>
                  <Field name="email">
                    {({ field }) => (
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        {...field}
                      />
                    )}
                  </Field>
                  {touched.email && errors.email && (
                    <span
                      style={{
                        fontSize: '1.4rem',
                        marginTop: '0.8rem',
                        display: 'block',
                      }}
                      className="text-danger"
                    >
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <Label htmlFor="password">Your password*</Label>
                  <Field name="password">
                    {({ field }) => (
                      <input
                        id="password"
                        type={`${
                          showPasswordField.includes('password')
                            ? 'text'
                            : 'password'
                        }`}
                        className="form-control"
                        placeholder="Enter your password"
                        {...field}
                      />
                    )}
                  </Field>
                  <i
                    onClick={() => handleTogglePassword('password')}
                    className="far fa-eye"
                  />
                  {touched.password && errors.password && (
                    <span
                      style={{
                        fontSize: '1.4rem',
                        marginTop: '0.8rem',
                        display: 'block',
                      }}
                      className="text-danger"
                    >
                      {errors.password}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <Label htmlFor="cfpassword">Your password*</Label>
                  <Field name="cfpassword">
                    {({ field }) => (
                      <input
                        id="cfpassword"
                        type={`${
                          showPasswordField.includes('cfpassword')
                            ? 'text'
                            : 'password'
                        }`}
                        className="form-control"
                        placeholder="Enter password again"
                        {...field}
                      />
                    )}
                  </Field>
                  <i
                    onClick={() => handleTogglePassword('cfpassword')}
                    className="far fa-eye"
                  />
                  {touched.cfpassword && errors.cfpassword && (
                    <span
                      style={{
                        fontSize: '1.4rem',
                        marginTop: '0.8rem',
                        display: 'block',
                      }}
                      className="text-danger"
                    >
                      {errors.cfpassword}
                    </span>
                  )}
                </div>
                <Link to="/signin">
                  <u className="form-text">I have already account</u>
                </Link>
                <Button
                  type="submit"
                  color="primary"
                  className="d-block"
                  disabled={!isValid}
                >
                  Signup
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
