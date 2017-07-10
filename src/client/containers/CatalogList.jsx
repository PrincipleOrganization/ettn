import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPoints } from '../actions/points';

class CatalogList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPoints();
  }

  render() {
    if (!this.props.points.isFetched) {
      return <h1>Loading...</h1>;
    }
    return (
      <div>
        <div>
          {this.props.points.data.map(({ id, name }) => (
            <div key={id}>
              <p>{name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  points: state.points,
}), { fetchPoints })(CatalogList);
