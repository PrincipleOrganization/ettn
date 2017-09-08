import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CSS_INPUT, Roles } from '../../../constants';
import { fetchUser, createUser, changeUser, deleteUser } from '../../../actions/users';

import CatalogForm from '../CatalogForm';

const UserForm = props => (
  <form>
    <div className="form-group">
      <label htmlFor="name">{'Ім\'я'}</label>
      <input
        type="text"
        className={CSS_INPUT}
        id="name"
        placeholder={'Ім\'я'}
        name="name"
        value={props.name}
        onChange={props.onChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="password">Пароль</label>
      <input
        type="password"
        className={CSS_INPUT}
        id="password"
        placeholder="Пароль"
        name="password"
        value={props.password}
        onChange={props.onChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="role">Роль</label>
      <select
        className="form-control"
        id="role"
        name="role"
        onChange={props.onChange}
        value={props.role}
      >
        <option value={Roles.ADMIN}>Адмін</option>
        <option value={Roles.CHANGE}>Користувач</option>
      </select>
    </div>
  </form>
);

UserForm.defaultProps = {
  name: '',
  password: '',
  role: Roles.CHANGE,
  onChange: () => {},
};

UserForm.propTypes = {
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const User = props => (
  <CatalogForm
    title="Користувач"
    id={props.match.params.id}
    blank={{ name: '', password: '', role: Roles.CHANGE }}
    data={props.users.data}
    m={props.users.m}
    e={props.users.e}
    isFetched={props.users.isFetched}
    history={props.history}
    url="/settings/users"
    fetch={props.fetchUser}
    create={props.createUser}
    change={props.changeUser}
    delete={props.deleteUser}
  >
    <UserForm />
  </CatalogForm>
);

User.defaultProps = {
  m: [],
  e: [],
};

User.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  users: PropTypes.shape({
    data: PropTypes.array.isRequired,
    m: PropTypes.array,
    e: PropTypes.array,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  fetchUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  changeUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

export default connect(state => ({
  users: state.users,
}), { fetchUser, createUser, changeUser, deleteUser })(User);
