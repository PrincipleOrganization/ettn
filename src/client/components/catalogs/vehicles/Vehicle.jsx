import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchVehicle, createVehicle, changeVehicle, deleteVehicle } from '../../../actions/vehicles';

import CatalogForm from '../CatalogForm';

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
          className="form-control"
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
          className="form-control"
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
    blank={{ name: '', type: 'truck' }}
    data={props.vehicles.data}
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

Vehicle.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  vehicles: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,

  fetchVehicle: PropTypes.func.isRequired,
  createVehicle: PropTypes.func.isRequired,
  changeVehicle: PropTypes.func.isRequired,
  deleteVehicle: PropTypes.func.isRequired,
};

export default connect(state => ({
  vehicles: state.vehicles,
}), { fetchVehicle, createVehicle, changeVehicle, deleteVehicle })(Vehicle);
