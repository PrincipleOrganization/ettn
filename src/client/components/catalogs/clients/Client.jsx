import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CSS_INPUT } from '../../../constants';
import { fetchClient, createClient, changeClient, deleteClient } from '../../../actions/clients';

import CatalogForm from '../CatalogForm';

const ClientForm = props => (
  <form>
    <div className="form-group">
      <label htmlFor="name">Назва</label>
      <input
        type="text"
        className={CSS_INPUT}
        id="name"
        placeholder="Назва"
        name="name"
        value={props.name}
        onChange={props.onChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="edrpou">ЕДРПОУ</label>
      <input
        type="text"
        className={CSS_INPUT}
        id="edrpou"
        placeholder="ЕДРПОУ"
        name="edrpou"
        value={props.edrpou}
        onChange={props.onChange}
      />
    </div>
  </form>
);

ClientForm.defaultProps = {
  name: '',
  edrpou: '',
  onChange: (e) => {
    e.preventDefault();
  },
};

ClientForm.propTypes = {
  name: PropTypes.string,
  edrpou: PropTypes.string,
  onChange: PropTypes.func,
};

const Client = props => (
  <CatalogForm
    title="Клієнт"
    id={props.match.params.id}
    blank={{ name: '', edrpou: '' }}
    data={props.clients.data}
    m={props.clients.m}
    e={props.clients.e}
    isFetched={props.clients.isFetched}
    history={props.history}
    url="/clients"
    fetch={props.fetchClient}
    create={props.createClient}
    change={props.changeClient}
    delete={props.deleteClient}
  >
    <ClientForm />
  </CatalogForm>
);

Client.defaultProps = {
  m: [],
  e: [],
};

Client.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  clients: PropTypes.shape({
    data: PropTypes.array.isRequired,
    m: PropTypes.array,
    e: PropTypes.array,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  fetchClient: PropTypes.func.isRequired,
  createClient: PropTypes.func.isRequired,
  changeClient: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
};

export default connect(state => ({
  clients: state.clients,
}), { fetchClient, createClient, changeClient, deleteClient })(Client);
