import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signout } from '../../actions/index';

const Navbar = ({ auth, signout }) => {
    const { email, isAuthenticated } = auth;
    const [isShowPopOver, setiIsShowPopOver] = useState(false);

    const handleShowPopOver = () => {
        setiIsShowPopOver(!isShowPopOver);
    };

    const renderLinks = () => {
        if (isAuthenticated) {
            return (
                <li className="nav-item">
                    <div onClick={handleShowPopOver} className="box-user">
                        <img className="user-image" src="https://s3.amazonaws.com/duolingo-images/avatar/default_2/medium" alt="" />
                        {isShowPopOver && <button onClick={signout} className="popover-btn" href="#">Signout</button>}
                    </div>
                </li>
            );
        } else {
            return (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signin">Signin</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
                </Fragment>
            );
        }
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
                            aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="box-logo">
                            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/schools-banner.svg" alt="Logo Learn English" />
                            <span className="box-logo-info">{email}</span>
                        </div>
                    </div>
                    <div className="col-sm-6 d-flex">
                        <div className="collapse navbar-collapse" id="collapsibleNavId">
                            <ul className="navbar-nav ml-auto text-right d-flex align-items-center">
                                {renderLinks()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

Navbar.propTypes = {
    auth: PropTypes.object
};

export default connect(mapStateToProps, { signout })(Navbar);