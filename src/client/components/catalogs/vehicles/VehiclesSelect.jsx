import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CatalogSelectModal from '../CatalogSelectModal';

import { fetchVehicles } from '../../../actions/vehicles';
import { Types } from './methods';

const main = { type: [Types.RAILCAR, Types.TRUCK] };
const secondary = { type: [Types.TRAILER] };

const VehiclesSelect = (props) => {
  let pick = main;
  if (props.secondary) {
    pick = secondary;
  }
  return (
    <CatalogSelectModal
      title="Транспортні засоби"
      id={props.id}
      name={props.name}
      data={props.vehicles.data}
      isFetched={props.vehicles.isFetched}
      fetch={props.fetchVehicles}
      select={props.select}
      pick={pick}
    />
  );
};

VehiclesSelect.defaultProps = {
  secondary: false,
};

VehiclesSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  vehicles: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  secondary: PropTypes.bool,

  fetchVehicles: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
};

export default connect(state => ({
  vehicles: state.vehicles,
}), { fetchVehicles })(VehiclesSelect);
