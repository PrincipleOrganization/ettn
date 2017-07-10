import React from 'react';
import PropTypes from 'prop-types';

const handleLogout = (e, logout) => {
  e.preventDefault();
  logout();
};

const Nav = props => (
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container-fluid">

      <div className="navbar-header">
        <p className="navbar-brand">еТТН</p>
      </div>

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li><a>Документи</a></li>
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
              <li><a>Водії</a></li>
              <li><a >Транспортні засоби</a></li>
              <li><a>Контрагенти</a></li>
              <li><a>Пункти</a></li>
              <li><a>Номенклатура</a></li>
            </ul>
          </li>
        </ul>

        <ul className="nav navbar-nav navbar-right">
          <li><button className="btn" onClick={props.refresh}>Оновити</button></li>
          <li className="dropdown">
            <a
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              { props.user.name }
              <span className="caret" />
            </a>
            <ul className="dropdown-menu">
              <li>
                <a onClick={e => handleLogout(e, props.logout)}>
                  Вийти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

    </div>
  </nav>
);

Nav.propTypes = {
  refresh: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Nav;
