import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CatalogSelectModal from '../CatalogSelectModal';

const ScalesSelect = props => (
  <div>
    <CatalogSelectModal
      title="Ваги"
      id={props.id}
      name={props.name}
      data={props.scales.data}
      isFetched={props.scales.isFetched}
      select={props.select}
    />
  </div>
);

ScalesSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  scales: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  select: PropTypes.func.isRequired,
};

export default connect(state => ({
  scales: state.scales,
}))(ScalesSelect);
