import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CSS_INPUT } from '../../../constants';
import { fetchDriver, createDriver, changeDriver, deleteDriver } from '../../../actions/drivers';

import CatalogForm from '../CatalogForm';

const DriverForm = props => (
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
  </form>
);

DriverForm.defaultProps = {
  name: '',
  onChange: (e) => {
    e.preventDefault();
  },
};

DriverForm.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
};

const Driver = props => (
  <CatalogForm
    title="Водії"
    id={props.match.params.id}
    blank={{ name: '' }}
    data={props.drivers.data}
    history={props.history}
    url="/drivers"
    fetch={props.fetchDriver}
    create={props.createDriver}
    change={props.changeDriver}
    delete={props.deleteDriver}
  >
    <DriverForm />
  </CatalogForm>
);

Driver.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  drivers: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,

  fetchDriver: PropTypes.func.isRequired,
  createDriver: PropTypes.func.isRequired,
  changeDriver: PropTypes.func.isRequired,
  deleteDriver: PropTypes.func.isRequired,
};

export default connect(state => ({
  drivers: state.drivers,
}), { fetchDriver, createDriver, changeDriver, deleteDriver })(Driver);
