import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logout } from '../actions/users';
import { Icon } from './elements';

import { Auth } from '../utils';

const handleLogout = (e, logoutFunc) => {
  e.preventDefault();
  logoutFunc();
};

const BrandImage = () => {
  const useTag = (
    <use
      id="Logo"
      xlinkHref="#_Image1"
      x="6.5"
      y="5.625"
      width="23.5px"
      height="26.5px"
      transform="matrix(0.979167,0,0,0.981481,0,0)"
    />
  );

  const image = (
    <image
      id="_Image1"
      width="24px"
      height="27px"
      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAbCAYAAABm409WAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB2UlEQVRIibWWPWtUQRSGn1kvuBoxTcRGEMFIYqWmUPxoREEM2FhYir2Vgo3Yp9Y/IP4GrUQLKz8QYxMk4C52Skz8WDQoq4/FeOWyzFzuurtvOXPmeeecuXPuBGqkbgMuAeeAWWAX0AZ+AOtAB3gI3A0hbNaxBsFT6pK6bjN9V2+r25vAj6mdhuBBddW5Oviiuvmf8FI99UDJDBX4AvAEyKX5FngBrBHP4SBwIhPbAQ6FEHolvK2uZHa0pl7MZDxXs+56NfBGJuiTuj9b07i2pb5PrP2m7kTdYjyclK7VwSsmJ9XfifWLqGcy8A9N4BWTjQTjTgtI1hd4PowB8DUxdqogfg0ptdWrQxhMJcZmg7pKbAMTUQvYMSk4YIvKZZuAXhVArgveBB6MAO8Dbwpi292XCChCCK9HMADiGbzLzB0ZFV4aPM3MHR6HAeqezE1WvTAuk8cZg+64DM7XZPFSbTVgLBibZl/9qM5UJ4N6v8ZkQ72lFgnwZXVV/ZXYWFH9o80AK8SXQ0594DPwEyiAaWBrTfzS4G7m1S81mQyjrro7Vcu96vKI8HvqdDYv4z/6is3fRaUeqcfVf6WvbXRqGzgKnAVOA/N/6w7QI74elomvu2dAJ4RglfEHH55z+d0GszMAAAAASUVORK5CYII="
    />
  );

  return (
    <div style={{ width: '20px' }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 38 38"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          strokeLinejoin: 'round',
          strokeMiterlimit: '1.41421',
        }}
      >
        <g id="Main">
          <path
            id="Background"
            d={`M37.5,3.621c0,-1.999 -1.622,-3.621 -3.621,-3.621l-30.258,0c-1.999,0 -3.621,
            1.622 -3.621,3.621l0,30.258c0,1.999 1.622,3.621 3.621,3.621l30.258,
            0c1.999,0 3.621,-1.622 3.621,-3.621l0,-30.258Z`}
            style={{ fill: '#a9c52f' }}
          />
          {useTag}
        </g>
        <defs>
          {image}
        </defs>
      </svg>
    </div>
  );
};

const Nav = ({ user, logout: logoutFunc }) => {
  let settings = null;
  let scales = null;
  if (Auth.userIsAdmin()) {
    settings = (
      <li>
        <NavLink to="/settings"><Icon.Settings />Налаштування</NavLink>
      </li>
    );

    scales = (
      <li><NavLink to="/scales">Ваги</NavLink></li>
    );
  }

  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">
  
        <div className="navbar-header">
          <span className="navbar-brand"><BrandImage /></span>
        </div>
  
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><NavLink to="/loadingBills">Документи</NavLink></li>
  
            <li className="dropdown">
              <a
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Довідники
                <span className="caret" />
              </a>
              <ul className="dropdown-menu">
                <li><NavLink to="/drivers">Водії</NavLink></li>
                <li><NavLink to="/vehicles">Транспортні засоби</NavLink></li>
                <li><NavLink to="/clients">Контрагенти</NavLink></li>
                <li><NavLink to="/points">Пункти</NavLink></li>
                <li><NavLink to="/nomenclature">Номенклатура</NavLink></li>
                {scales}
              </ul>
            </li>
  
            <li className="dropdown">
              <a
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Звіти
                <span className="caret" />
              </a>
              <ul className="dropdown-menu">
<<<<<<< HEAD
                <li><NavLink to="/weighings-journal">Журнал зважувань</NavLink></li>
=======
                <li><NavLink to="/drivers">Водії</NavLink></li>
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
              </ul>
            </li>
          </ul>
  
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <Icon.User />
                {user.name}
                <span className="caret" />
              </a>
              <ul className="dropdown-menu">
                {settings}
                <li>
                  <NavLink to="/login" onClick={e => handleLogout(e, logoutFunc)}>
                    <Icon.Logout />Вийти
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
  
      </div>
    </nav>
  );
};

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(state => ({
  user: state.users.user,
}), { logout })(Nav);
