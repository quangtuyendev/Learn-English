import classnames from 'classnames';
import _ from 'lodash';
import React, { useContext, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from '../../actions';

import { LINKS } from '../../constants';
import { AuthContext } from '../../contexts/auth';
import useClickOutside from '../../utils/useClickOutside';
import useEscKeyDown from '../../utils/useEscKeyDown';

export default function Navbar() {
  const refMain = useRef();
  const refSub = useRef();
  const [auth, dispatch] = useContext(AuthContext);
  const { isAuthenticated, email } = auth;
  const [isShowPopOver, setiIsShowPopOver] = useState(false);
  const { pathname } = useLocation();

  const handleSignout = () => {
    dispatch(signOut());
  };

  useEscKeyDown(() => {
    setiIsShowPopOver(false);
  });

  useClickOutside(refMain, refSub, () => {
    setiIsShowPopOver(false);
  });

  const renderLinks = () => {
    if (isAuthenticated) {
      return (
        <li className="nav-item">
          <div
            onClick={() => setiIsShowPopOver(!isShowPopOver)}
            className="box-user"
          >
            <img
              ref={refSub}
              className="user-image"
              src="https://s3.amazonaws.com/duolingo-images/avatar/default_2/medium"
              alt=""
            />
            {isShowPopOver && (
              <button
                type="button"
                ref={refMain}
                onClick={handleSignout}
                className="popover-btn"
                href="#"
              >
                Signout
              </button>
            )}
          </div>
        </li>
      );
    } else {
      return _.map(LINKS, ({ path, name }) => (
        <li
          key={name}
          className={classnames('nav-item', {
            active:
              _.toLower(_.startCase(pathname)) === _.toLower(_.camelCase(name)),
          })}
        >
          <Link className="nav-link" to={path}>
            {name}
          </Link>
        </li>
      ));
    }
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavId"
              aria-controls="collapsibleNavId"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="box-logo">
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/schools-banner.svg"
                alt="Logo Learn English"
              />
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
}
