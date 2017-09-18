import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CatalogSelectModal from '../CatalogSelectModal';

const PointsSelect = props => (
  <div>
    <CatalogSelectModal
      title="Пункти"
      id={props.id}
      name={props.name}
      data={props.points.data}
      isFetched={props.points.isFetched}
      select={props.select}
    />
  </div>
);

PointsSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  select: PropTypes.func.isRequired,
};

export default connect(state => ({
  points: state.points,
}))(PointsSelect);
