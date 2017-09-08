import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchDrivers, changeDriver } from '../../../actions/drivers';

import CatalogList from '../CatalogList';

const DriversList = (props) => {
  const { data, isFetched } = props.drivers;
  return (
    <div>
      <CatalogList
        title="Водії"
        data={data}
        url="/drivers"
        history={props.history}
        isFetched={isFetched}
        fetch={props.fetchDrivers}
        change={props.changeDriver}
      />
    </div>
  );
};

DriversList.propTypes = {
  drivers: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({}).isRequired,

  fetchDrivers: PropTypes.func.isRequired,
  changeDriver: PropTypes.func.isRequired,
};

export default connect(state => ({
  drivers: state.drivers,
}), { fetchDrivers, changeDriver })(DriversList);
