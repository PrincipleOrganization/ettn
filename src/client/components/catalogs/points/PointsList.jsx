import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPoints, deletePoint } from '../../../actions/points';

import CatalogList from '../CatalogList';

const PointsList = (props) => {
  const { data, isFetched } = props.points;
  return (
    <CatalogList
      title="Пункти"
      data={data}
      url="/points"
      isFetched={isFetched}
      history={props.history}
      fetch={props.fetchPoints}
      delete={props.deletePoint}
    />
  );
};

PointsList.propTypes = {
  points: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({}).isRequired,

  fetchPoints: PropTypes.func.isRequired,
  deletePoint: PropTypes.func.isRequired,
};

export default connect(state => ({
  points: state.points,
}), { fetchPoints, deletePoint })(PointsList);
