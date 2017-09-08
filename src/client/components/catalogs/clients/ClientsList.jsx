import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchClients, deleteClient, changeClient } from '../../../actions/clients';

import CatalogList from '../CatalogList';

const ClientsList = (props) => {
  const { data, isFetched } = props.clients;
  return (
    <div>
      <CatalogList
        title="Контрагенти"
        data={data}
        url="/clients"
        isFetched={isFetched}
        history={props.history}
        fetch={props.fetchClients}
        change={props.changeClient}
      />
    </div>
  );
};

ClientsList.propTypes = {
  clients: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({}).isRequired,

  fetchClients: PropTypes.func.isRequired,
  changeClient: PropTypes.func.isRequired,
};

export default connect(state => ({
  clients: state.clients,
}), { fetchClients, changeClient })(ClientsList);
