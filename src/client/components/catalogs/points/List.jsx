import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CatalogList from '../../CatalogList';

class List extends Component {
  componentDidMount() {
    this.props.fetchPoints();
  }

  pointOnClick(e) {
    console.log(e);
  }

  render() {
    const { data, isFetched } = this.props.points;
    return (
      <div>
        <CatalogList
          data={data}
          isFetched={isFetched}
          rowOnClick={this.pointOnClick}
        />
      </div>
    );
  }
}

List.propTypes = {
  points: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  fetchPoints: PropTypes.func.isRequired,
};

export default connect(state => ({
  points: state.points,
}), { fetchPoints })(List);
