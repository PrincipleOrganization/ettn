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
      <label htmlFor="url">URL</label>
      <input
        type="text"
        className={CSS_INPUT}
        id="url"
        placeholder="URL"
        name="url"
        value={props.url}
        onChange={props.onChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="socketUrl">Socket URL</label>
      <input
        type="text"
        className={CSS_INPUT}
        id="socketUrl"
        placeholder="Socket URL"
        name="socketUrl"
        value={props.socketUrl}
        onChange={props.onChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="apiVersion">Api Version</label>
      <input
        type="text"
        className={CSS_INPUT}
        id="apiVersion"
        placeholder="Api Version"
        name="apiVersion"
        value={props.apiVersion}
        onChange={props.onChange}
      />
    </div>
  </form>
);

ScaleForm.defaultProps = {
  name: '',
  baseUrl: '',
  url: '',
  socketUrl: '',
  apiVersion: '',
  onChange: (e) => {
    e.preventDefault();
  },
};

ScaleForm.propTypes = {
  name: PropTypes.string,
  baseUrl: PropTypes.string,
  url: PropTypes.string,
  socketUrl: PropTypes.string,
  apiVersion: PropTypes.string,
  onChange: PropTypes.func,
};

const Scale = props => (
  <CatalogForm
    title="Клієнт"
    id={props.match.params.id}
    blank={{ name: '', baseUrl: '', url: '', socketUrl: '', apiVersion: '' }}
    data={props.scales.data}
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

Scale.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  scales: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,

  fetchScale: PropTypes.func.isRequired,
  createScale: PropTypes.func.isRequired,
  changeScale: PropTypes.func.isRequired,
  deleteScale: PropTypes.func.isRequired,
};

export default connect(state => ({
  scales: state.scales,
}), { fetchScale, createScale, changeScale, deleteScale })(Scale);
