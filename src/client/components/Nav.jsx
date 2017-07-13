import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import { logout } from '../actions/users';

const handleLogout = (e, logoutFunc) => {
  e.preventDefault();
  logoutFunc();
};

const Nav = ({ user, logout: logoutFunc }) => (
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container-fluid">

      <div className="navbar-header">
        <p className="navbar-brand">еТТН</p>
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
              {user.name}
              <span className="caret" />
            </a>
            <ul className="dropdown-menu">
              <li>
                <a>Налаштування</a>
              </li>
              <li>
                <Link to="/login" onClick={e => handleLogout(e, logoutFunc)}>
                  Вийти
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

    </div>
  </nav>
);

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(state => ({
  user: state.users.user,
}), { logout })(Nav);
