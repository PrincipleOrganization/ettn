import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login, fetchUsers } from '../actions/users';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      password: '',
    };

    this.authorizeUser = this.authorizeUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  authorizeUser(e) {
    e.preventDefault();

    const { user, password } = this.state;
    this.props.login(user, password);
  }

  handleInputChange(e) {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const users = this.props.users.data;
    const usersToSelect = users.map(user => (
      <option key={user.id} value={user.name} >{ user.name }</option>
    ));
    usersToSelect.unshift(<option key={''} disabled value={''}>Вкажіть користувача</option>);

    const user = this.state.user;

    return (
      <div className="login-page">
        <h2>еТТН</h2>

        <form onSubmit={this.authorizeUser}>
          <div className="form-group">
            <label htmlFor="user">Користувач</label>
            <select
              className="form-control"
              id="user"
              name="user"
              onChange={this.handleInputChange}
              value={user}
            >
              { usersToSelect }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Пароль"
              name="password"
              onChange={this.handleInputChange}
            />
          </div>

          <button className="btn btn-primary" type="submit">Увійти</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  users: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  fetchUsers: PropTypes.func.isRequired,
};

export default connect(state => ({
  users: state.users,
}), { login, fetchUsers })(Login);
