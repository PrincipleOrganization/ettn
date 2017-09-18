import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CatalogSelectModal from '../CatalogSelectModal';

const DriversSelect = props => (
  <div>
    <CatalogSelectModal
      title="Водії"
      id={props.id}
      name={props.name}
      data={props.drivers.data}
      isFetched={props.drivers.isFetched}
      select={props.select}  
    />
  </div>
);

DriversSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  drivers: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  select: PropTypes.func.isRequired,
};

export default connect(state => ({
  drivers: state.drivers,
}))(DriversSelect);
