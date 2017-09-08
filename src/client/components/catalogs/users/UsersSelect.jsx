import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CatalogSelectModal from '../CatalogSelectModal';

import { fetchUsers } from '../../../actions/users';

const UsersSelect = props => (
  <div>
    <CatalogSelectModal
      title="Користувачі"
      id={props.id}
      name={props.name}
      data={props.users.data}
      isFetched={props.users.isFetched}
      fetch={props.fetchUsers}
      select={props.select}
    />
  </div>
);

UsersSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  users: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  fetchUsers: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
};

export default connect(state => ({
  users: state.users,
}), { fetchUsers })(UsersSelect);
