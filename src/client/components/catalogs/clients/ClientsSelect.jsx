import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CatalogSelectModal from '../CatalogSelectModal';

const ClientsSelect = props => (
  <div>
    <CatalogSelectModal
      title="Контрагенти"
      id={props.id}
      name={props.name}
      data={props.clients.data}
      isFetched={props.clients.isFetched}
      select={props.select}
    />
  </div>
);

ClientsSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  clients: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  select: PropTypes.func.isRequired,
};

export default connect(state => ({
  clients: state.clients,
}))(ClientsSelect);
