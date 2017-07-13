import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchVehicles, deleteVehicle } from '../../../actions/vehicles';

import CatalogList from '../CatalogList';

const VehiclesList = (props) => {
  const { data, isFetched } = props.vehicles;
  return (
    <div>
      <CatalogList
        title="Транспортні засоби"
        data={data}
        url="/vehicles"
        isFetched={isFetched}
        history={props.history}
        fetch={props.fetchVehicles}
        delete={props.deleteVehicle}
      />
    </div>
  );
};

VehiclesList.propTypes = {
  vehicles: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({}).isRequired,

  fetchVehicles: PropTypes.func.isRequired,
  deleteVehicle: PropTypes.func.isRequired,
};

export default connect(state => ({
  vehicles: state.vehicles,
}), { fetchVehicles, deleteVehicle })(VehiclesList);
