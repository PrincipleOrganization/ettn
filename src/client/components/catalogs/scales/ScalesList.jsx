import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchScales, changeScale } from '../../../actions/scales';

import CatalogList from '../CatalogList';

const ScalesList = (props) => {
  const { data, isFetched } = props.scales;
  return (
    <div>
      <CatalogList
        title="Ваги"
        data={data}
        url="/scales"
        isFetched={isFetched}
        history={props.history}
        fetch={props.fetchScales}
        change={props.changeScale}
      />
    </div>
  );
};

ScalesList.propTypes = {
  scales: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({}).isRequired,

  fetchScales: PropTypes.func.isRequired,
  changeScale: PropTypes.func.isRequired,
};

export default connect(state => ({
  scales: state.scales,
}), { fetchScales, changeScale })(ScalesList);
