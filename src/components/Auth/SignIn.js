import { Field, Form, Formik } from 'formik';
import md5 from 'md5';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Col, Container, Label, Row } from 'reactstrap';
import { AuthContext } from '../../contexts/auth';
import { UserContext } from '../../contexts/user';
import * as utils from '../../utils';

import { signIn } from '../../actions';

export default function SignIn() {
  const [showPassword, setShowpassword] = useState(false);
  const history = useHistory();
  const [users] = useContext(UserContext);
  const [, dispatch] = useContext(AuthContext);

  // validate signin
  const validation = ({ email, password }) => {
    const errors = {};
    const userCurrent = utils.findUser(users, email);
    const { email: userEmail, password: userPassword } = userCurrent;

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email address';
    } else if (!userEmail) {
      errors.email = 'Email does not exist';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    } else if (!errors.email && userPassword !== md5(password)) {
      errors.password = 'Wrong password';
    }
    return errors;
  };

  const handleSubmit = ({ email }) => {
    dispatch(
      signIn({ email, isAuthenticated: true }, () => {
        history.push('/');
        localStorage.setItem(
          'currentUser',
          JSON.stringify({ email, isAuthenticated: true })
        );
      })
    );
  };

  return (
    <Container className="container mt-5">
      <Row className="row mt-5">
        <Col className="col-sm-5 mx-auto">
          <Formik
            initialValues={{
              email: '',
              password: '',
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
                        type={`${showPassword ? 'text' : 'password'}`}
                        className="form-control"
                        placeholder="Enter your password"
                        {...field}
                      />
                    )}
                  </Field>
                  <i
                    onClick={() => setShowpassword(!showPassword)}
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
                <Link to="/signup">
                  <u className="form-text">Register account here</u>
                </Link>
                <Button
                  type="submit"
                  color="primary"
                  className="d-block"
                  disabled={!isValid}
                >
                  Signin
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
