import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CatalogSelectModal from '../CatalogSelectModal';

import { fetchVehicles } from '../../../actions/vehicles';

const VehiclesSelect = props => (
  <div>
    <CatalogSelectModal
      title="Транспортні засоби"
      id={props.id}
      name={props.name}
      data={props.vehicles.data}
      isFetched={props.vehicles.isFetched}
      fetch={props.fetchVehicles}
      select={props.select}
    />
  </div>
);

VehiclesSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  vehicles: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  fetchVehicles: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
};

export default connect(state => ({
  vehicles: state.vehicles,
}), { fetchVehicles })(VehiclesSelect);
