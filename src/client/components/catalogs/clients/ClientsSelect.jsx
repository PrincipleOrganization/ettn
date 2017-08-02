import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CatalogSelectModal from '../CatalogSelectModal';

import { fetchClients } from '../../../actions/clients';

const ClientsSelect = props => (
  <div>
    <CatalogSelectModal
      title="Контрагенти"
      id={props.id}
      name={props.name}
      data={props.clients.data}
      isFetched={props.clients.isFetched}
      fetch={props.fetchClients}
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

  fetchClients: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
};

export default connect(state => ({
  clients: state.clients,
}), { fetchClients })(ClientsSelect);
