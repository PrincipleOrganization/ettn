import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchUsers, changeUser } from '../../../actions/users';

import CatalogList from '../CatalogList';

const UsersList = (props) => {
  const { data, isFetched } = props.users;
  return (
    <div>
      <CatalogList
        title="Користувачі"
        data={data}
        url="/settings/users"
        baseUrl="/settings"
        baseUrlTitle="Налаштування"
        isFetched={isFetched}
        history={props.history}
        fetch={props.fetchUsers}
        change={props.changeUser}
      />
    </div>
  );
};

UsersList.propTypes = {
  users: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({}).isRequired,

  fetchUsers: PropTypes.func.isRequired,
  changeUser: PropTypes.func.isRequired,
};

export default connect(state => ({
  users: state.users,
}), { fetchUsers, changeUser })(UsersList);
