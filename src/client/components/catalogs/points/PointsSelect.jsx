import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CatalogSelectModal from '../CatalogSelectModal';

import { fetchPoints } from '../../../actions/points';

const PointsSelect = props => (
  <div>
    <CatalogSelectModal
      title="Пункти"
      id={props.id}
      name={props.name}
      data={props.points.data}
      isFetched={props.points.isFetched}
      fetch={props.fetchPoints}
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

  fetchPoints: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
};

export default connect(state => ({
  points: state.points,
}), { fetchPoints })(PointsSelect);
