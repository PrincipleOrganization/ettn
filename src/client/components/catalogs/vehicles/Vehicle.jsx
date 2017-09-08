import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CSS_INPUT } from '../../../constants';
import { fetchVehicle, createVehicle, changeVehicle, deleteVehicle } from '../../../actions/vehicles';

import CatalogForm from '../CatalogForm';

import { Types } from '../vehicles/methods';

const VehicleForm = (props) => {
  const types = [
    { name: 'Автомобіль', value: 'truck' },
    { name: 'Причеп', value: 'trailer' },
    { name: 'Вагон', value: 'railcar' },
  ];
  const typesToSelect = types.map(type => (
    <option key={types.indexOf(type)} value={type.value} >{type.name}</option>
  ));
  return (
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
        <label htmlFor="type">Тип</label>
        <select
          className={CSS_INPUT}
          id="type"
          name="type"
          onChange={props.onChange}
          value={props.type}
        >
          { typesToSelect }
        </select>
      </div>
    </form>
  );
};

VehicleForm.defaultProps = {
  name: '',
  type: '',
  e: [],
  onChange: (e) => {
    e.preventDefault();
  },
};

VehicleForm.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

const Vehicle = props => (
  <CatalogForm
    title="Транспортний Засіб"
    id={props.match.params.id}
    blank={{ name: '', type: Types.TRUCK }}
    data={props.vehicles.data}
    m={props.vehicles.m}
    e={props.vehicles.e}
    isFetched={props.vehicles.isFetched}
    history={props.history}
    url="/vehicles"
    fetch={props.fetchVehicle}
    create={props.createVehicle}
    change={props.changeVehicle}
    delete={props.deleteVehicle}
  >
    <VehicleForm />
  </CatalogForm>
);

Vehicle.defaultProps = {
  m: [],
  e: [],
};

Vehicle.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  vehicles: PropTypes.shape({
    data: PropTypes.array.isRequired,
    m: PropTypes.array,
    e: PropTypes.array,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  fetchVehicle: PropTypes.func.isRequired,
  createVehicle: PropTypes.func.isRequired,
  changeVehicle: PropTypes.func.isRequired,
  deleteVehicle: PropTypes.func.isRequired,
};

export default connect(state => ({
  vehicles: state.vehicles,
}), { fetchVehicle, createVehicle, changeVehicle, deleteVehicle })(Vehicle);
