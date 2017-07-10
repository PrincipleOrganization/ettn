import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    return (
      <div className="login-page">
        <h2>еТТН</h2>

        <form onSubmit={this.authorizeUser}>
          <div className="form-group">
            <label htmlFor="user">Користувач</label>
            <input
              type="text"
              className="form-control"
              id="user"
              placeholder="Користувач"
              name="user"
              onChange={this.handleInputChange}
            />
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
};

export default Login;
