import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CatalogSelectModal from '../CatalogSelectModal';

<<<<<<< HEAD
=======
import { fetchUsers } from '../../../actions/users';

>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
const UsersSelect = props => (
  <div>
    <CatalogSelectModal
      title="Користувачі"
      id={props.id}
      name={props.name}
      data={props.users.data}
      isFetched={props.users.isFetched}
<<<<<<< HEAD
=======
      fetch={props.fetchUsers}
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
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
<<<<<<< HEAD
=======

  fetchUsers: PropTypes.func.isRequired,
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
  select: PropTypes.func.isRequired,
};

export default connect(state => ({
  users: state.users,
<<<<<<< HEAD
}))(UsersSelect);
=======
}), { fetchUsers })(UsersSelect);
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
