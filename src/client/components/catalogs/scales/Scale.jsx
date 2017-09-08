import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CSS_INPUT } from '../../../constants';
import { fetchScale, createScale, changeScale, deleteScale } from '../../../actions/scales';

import CatalogForm from '../CatalogForm';

const ScaleForm = props => (
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
      <label htmlFor="baseUrl">Base URL</label>
      <input
        type="text"
        className={CSS_INPUT}
        id="baseUrl"
        placeholder="Base URL"
        name="baseUrl"
        value={props.baseUrl}
        onChange={props.onChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="socketPort">Socket Port</label>
      <input
        type="text"
        className={CSS_INPUT}
        id="socketPort"
        placeholder="Socket Port"
        name="socketPort"
        value={props.socketPort}
        onChange={props.onChange}
      />
    </div>
    <div className="form-group">
    <label htmlFor="event">Event</label>
      <input
        type="text"
        className={CSS_INPUT}
        id="event"
        placeholder="Event"
        name="event"
        value={props.event}
        onChange={props.onChange}
      />
    </div>
  </form>
);

ScaleForm.defaultProps = {
  name: '',
  baseUrl: '',
  socketPort: '',
  event: '',
  onChange: (e) => {
    e.preventDefault();
  },
};

ScaleForm.propTypes = {
  name: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  socketPort: PropTypes.string.isRequired,
  event: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

const blank = { 
  name: '', 
  baseUrl: '', 
  socketPort: '', 
  event: '',
};

const Scale = props => (
  <CatalogForm
    title="Клієнт"
    id={props.match.params.id}
    blank={blank}
    data={props.scales.data}
    m={props.scales.m}
    e={props.scales.e}
    isFetched={props.scales.isFetched}
    history={props.history}
    url="/scales"
    fetch={props.fetchScale}
    create={props.createScale}
    change={props.changeScale}
    delete={props.deleteScale}
  >
    <ScaleForm />
  </CatalogForm>
);

Scale.defaultProps = {
  m: [],
  e: [],
};

Scale.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  scales: PropTypes.shape({
    data: PropTypes.array.isRequired,
    m: PropTypes.array,
    e: PropTypes.array,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  fetchScale: PropTypes.func.isRequired,
  createScale: PropTypes.func.isRequired,
  changeScale: PropTypes.func.isRequired,
  deleteScale: PropTypes.func.isRequired,
};

export default connect(state => ({
  scales: state.scales,
}), { fetchScale, createScale, changeScale, deleteScale })(Scale);
